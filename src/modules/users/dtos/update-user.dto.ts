import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  first_name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  last_name?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  bio?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  is_admin?: boolean;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  state_id?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  city_id?: string;
}
