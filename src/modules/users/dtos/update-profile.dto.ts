import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @IsString()
  @ApiProperty()
  first_name: string;
  @IsString()
  @ApiProperty()
  last_name: string;
  @IsString()
  @ApiProperty()
  bio: string;
}
