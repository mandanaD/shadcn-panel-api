import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { GetUsersQueryDto } from './dtos/get-users-query.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private userRepo: Repository<Users>) {}

  getUsers(query: GetUsersQueryDto) {
    const qb = this.userRepo.createQueryBuilder('user');

    if (query.search) {
      qb.where(
        '(user.first_name ILIKE :search OR user.last_name ILIKE :search OR user.email ILIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    if (query.ordering) {
      const order = query.ordering.startsWith('-') ? 'DESC' : 'ASC';
      const field = query.ordering.replace('-', '');

      if (field === 'created_at') {
        qb.orderBy(`user.${field}`, order);
      }
    }
    return qb.getMany();
  }

  async createUser(data: CreateUserDto) {
    const userWithSameEmail = await this.userRepo.findOne({
      where: { email: data.email },
    });
    if (!userWithSameEmail) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
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
    return this.userRepo.save({
      ...user,
      ...body,
    });
  }
}
