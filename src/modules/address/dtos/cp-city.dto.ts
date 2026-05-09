import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CPCityDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  label: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  state: string;
}
