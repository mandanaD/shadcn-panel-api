import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  search: string;
}
