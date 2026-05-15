import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { AddressService } from '../address/address.service';
import { QueryDto } from '../../dto/query.dto';
import { applyQueryOptions } from '../../common/query/utils/applyQueryOptions';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
    private addressService: AddressService,
  ) {}

  getUsers(queryDto: QueryDto) {
    const { page, limit, search, ordering } = queryDto;
    const query = this.userRepo.createQueryBuilder();
    return applyQueryOptions<Users>(query, {
      search,
      searchFields: ['first_name', 'last_name', 'email'],
      ordering,
      orderFields: ['first_name', 'created_at'],
      limit,
      page,
    });
  }

  async createUser(data: CreateUserDto) {
    const userWithSameEmail = await this.userRepo.findOne({
      where: { email: data.email },
    });
    if (!userWithSameEmail) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      if (data?.state_id || data?.city_id) {
        const finalVal = await this.addressService.checkAddress(data);
        Object.assign(data, finalVal);
      }
      const user = this.userRepo.create({
        ...data,
        password: hashedPassword,
      });
      return await this.userRepo.save(user);
    } else {
      throw new BadRequestException('User already exists');
    }
  }

  getUser(id: string) {
    return this.userRepo.findOne({
      where: { id },
      relations: ['_created_by'],
    });
  }

  async updateUser(id: string, body: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, body);
    if (body?.state_id || body?.city_id) {
      const data = await this.addressService.checkAddress(body);
      Object.assign(user, data);
    }
    return this.userRepo.save(user);
  }

  async deleteUser(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepo.remove(user);

    return user;
  }

  async getProfile(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateProfile(id: string, body: UpdateProfileDto) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    let finalResult = {
      ...user,
      ...body,
    };
    if (body?.state_id || body?.city_id) {
      const data = await this.addressService.checkAddress(body);
      finalResult = {
        ...finalResult,
        ...data,
      };
    }
    return this.userRepo.save(finalResult);
  }
}
