import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  message: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({ required: false })
  owner?: string;
}
