import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), AddressModule],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
})
export class UsersModule {}
