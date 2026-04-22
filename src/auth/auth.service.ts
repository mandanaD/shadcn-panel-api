import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './dtos/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Users) private authRepo: Repository<Users>) {}
  async signup(signupDto: SignupDto) {
    const userWithSameEmail = await this.authRepo.findOne({
      where: { email: signupDto.email },
    });
    if (!userWithSameEmail) {
      const hashedPassword = await bcrypt.hash(signupDto.password, 10);
      const user = this.authRepo.create({
        ...signupDto,
        password: hashedPassword,
      });
      return this.authRepo.save(user);
    } else {
      throw new BadRequestException('User already exists');
    }
  }
  async login(loginDto: LoginDto) {
    const userWithSameEmail = await this.authRepo.findOne({
      where: { email: loginDto.email },
    });
    if (!userWithSameEmail) {
      throw new BadRequestException('User do not exists, signup first');
    }
    const isSamePassword = await bcrypt.compare(
      loginDto.password,
      userWithSameEmail.password,
    );
    if (!isSamePassword) {
      throw new BadRequestException('incorrect email or password');
    }
    return userWithSameEmail;
  }
}
