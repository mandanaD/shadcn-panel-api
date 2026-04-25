import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Users } from './users.entity';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: Partial<Users>) {
    return this.usersService.getProfile(user.id || '');
  }
}
