import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';

export class CreateUserDto extends BaseUserDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  is_admin?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  bio?: string;
}
