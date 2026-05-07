import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Users } from './users.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiGoneResponse,
} from '@nestjs/swagger';
import { GetUsersQueryDto } from './dtos/get-users-query.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { User } from './dtos/user.dto';
import { ApiResponse } from '../../decorator/api-response.decorator';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
@Serialize(User)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  @ApiBearerAuth('access-token')
  @ApiResponse({ dto: User, isArray: true })
  getUsers(@Query() query: GetUsersQueryDto) {
    return this.usersService.getUsers(query);
  }

  @Post('')
  @ApiBearerAuth('access-token')
  @ApiResponse({ dto: User })
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Get('profile')
  @ApiBearerAuth('access-token')
  @ApiResponse({ dto: User })
  getProfile(@CurrentUser() user: Partial<Users>) {
    return this.usersService.getProfile(user.id || '');
  }

  @Patch('profile')
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ type: User })
  updateProfile(
    @Body() body: UpdateProfileDto,
    @CurrentUser() user: Partial<Users>,
  ) {
    return this.usersService.updateProfile(user.id || '', body);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiResponse({ dto: User })
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiResponse({ dto: User })
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiGoneResponse({ type: User })
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
