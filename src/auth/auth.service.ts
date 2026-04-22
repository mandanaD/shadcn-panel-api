import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './dtos/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private authRepo: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async generateTokens(user: Users) {
    const payload = {
      sub: user.id,
      email: user.email,
      is_admin: user.is_admin,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return { access_token, refresh_token };
  }

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
      const savedUser = await this.authRepo.save(user);

      const tokens = await this.generateTokens(savedUser);

      return {
        ...tokens,
        user: {
          id: savedUser.id,
          email: savedUser.email,
          first_name: savedUser.first_name,
          last_name: savedUser.last_name,
          is_admin: savedUser.is_admin,
        },
      };
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

    const tokens = await this.generateTokens(userWithSameEmail);

    return {
      ...tokens,
      user: {
        id: userWithSameEmail.id,
        email: userWithSameEmail.email,
        first_name: userWithSameEmail.first_name,
        last_name: userWithSameEmail.last_name,
        is_admin: userWithSameEmail.is_admin,
      },
    };
  }
}
