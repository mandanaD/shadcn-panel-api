import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  first_name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  last_name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  bio?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  state_id?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  city_id?: string;
}
