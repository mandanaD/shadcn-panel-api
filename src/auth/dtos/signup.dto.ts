import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
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
  password: string;
}
