import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { GetUsersQueryDto } from './dtos/get-users-query.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

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

  getUser(id: string) {
    return this.userRepo.findOne({
      where: { id },
    });
  }

  async updateUser(id: string, body: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepo.save({
      ...body,
      ...user,
    });
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
