import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  first_name: string;
  @IsString()
  @ApiProperty()
  last_name: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsString()
  @ApiProperty()
  bio: string;
  @IsBoolean()
  @ApiProperty()
  is_admin: string;
}
