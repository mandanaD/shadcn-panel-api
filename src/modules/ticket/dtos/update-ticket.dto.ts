import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class UpdateTicketDto {
  @IsString()
  @IsOptional()
  @MinLength(6)
  @ApiProperty()
  subject?: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({ required: false })
  owner?: string;
}
