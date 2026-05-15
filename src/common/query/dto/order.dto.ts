import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  ordering: string;
}
