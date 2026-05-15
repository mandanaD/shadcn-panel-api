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
  ApiOkResponse,
} from '@nestjs/swagger';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { Admin } from '../../decorator/admin.decorator';
import { ApiPagination } from '../../decorator/api-pagination.decorator';
import { QueryDto } from '../../dto/query.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  @Admin()
  @ApiBearerAuth('access-token')
  @ApiPagination(User)
  getUsers(@Query() query: QueryDto) {
    return this.usersService.getUsers(query);
  }

  @Post('')
  @Admin()
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ type: User })
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Get('profile')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ type: User })
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
  @Admin()
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ type: User })
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Patch(':id')
  @Admin()
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ type: User })
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  @Admin()
  @ApiBearerAuth('access-token')
  @ApiGoneResponse({ type: User })
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
