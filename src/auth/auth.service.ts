import { BadRequestException, Injectable } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { Users } from '../users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './dtos/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './refresh-token.entity';
import { randomUUID } from 'crypto';

export type payloadType = {
  sub: string;
  email: string;
  is_admin: boolean;
  token_id: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
    @InjectRepository(RefreshToken) private authRepo: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async generateTokens(user: Users) {
    const tokenId = randomUUID();

    const payload = {
      sub: user.id,
      email: user.email,
      is_admin: user.is_admin,
      token_id: tokenId,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    const hashed = await bcrypt.hash(refresh_token, 10);

    await this.authRepo.save({
      id: tokenId,
      user,
      token: hashed,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { access_token, refresh_token };
  }

  async signup(signupDto: SignupDto) {
    const userWithSameEmail = await this.userRepo.findOne({
      where: { email: signupDto.email },
    });
    if (!userWithSameEmail) {
      const hashedPassword = await bcrypt.hash(signupDto.password, 10);
      const user = this.userRepo.create({
        ...signupDto,
        password: hashedPassword,
      });
      const savedUser = await this.userRepo.save(user);

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
    const userWithSameEmail = await this.userRepo.findOne({
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

    await this.authRepo.delete({
      revoked: true,
      expires_at: LessThan(new Date()),
    });

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

  async validateRefreshToken(refreshToken: string) {
    let decodeToken: payloadType;
    try {
      decodeToken = this.jwtService.verify<payloadType>(refreshToken);
    } catch {
      throw new BadRequestException('Invalid or expired refresh token');
    }

    const token = await this.authRepo.findOne({
      where: {
        id: decodeToken.token_id,
      },
      relations: ['user'],
    });

    if (!token) {
      throw new BadRequestException('Invalid refresh token');
    }

    const user = token.user;

    if (token.revoked) {
      throw new BadRequestException('Refresh token has been revoked');
    }

    if (token.expires_at < new Date()) {
      throw new BadRequestException('Refresh token expired');
    }

    const isValid = await bcrypt.compare(refreshToken, token.token);

    if (!isValid) {
      throw new BadRequestException('Invalid refresh token');
    }
    return { token, user };
  }

  async refresh(refreshToken: string) {
    const { token, user } = await this.validateRefreshToken(refreshToken);
    await this.authRepo.save({
      ...token,
      revoked: true,
    });

    return this.generateTokens(user);
  }

  async logout(refreshToken: string) {
    const { token } = await this.validateRefreshToken(refreshToken);
    await this.authRepo.save({
      ...token,
      revoked: true,
    });
    return { message: 'Logged out' };
  }
}
