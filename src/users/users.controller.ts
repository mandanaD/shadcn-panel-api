import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Users } from './users.entity';
import { JwtGuard } from '../auth/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUsersQueryDto } from './dtos/get-users-query.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { User } from './dtos/user.dto';

@Controller('users')
@UseGuards(JwtGuard)
@Serialize(User)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  @ApiBearerAuth('access-token')
  getUsers(@Query() query: GetUsersQueryDto) {
    return this.usersService.getUsers(query);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Get('profile')
  @ApiBearerAuth('access-token')
  getProfile(@CurrentUser() user: Partial<Users>) {
    return this.usersService.getProfile(user.id || '');
  }

  @Patch('profile')
  @ApiBearerAuth('access-token')
  updateProfile(
    @Body() body: UpdateProfileDto,
    @CurrentUser() user: Partial<Users>,
  ) {
    return this.usersService.updateProfile(user.id || '', body);
  }
}
