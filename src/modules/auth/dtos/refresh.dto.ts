import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  refresh_token: string;
}
