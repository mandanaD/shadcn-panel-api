import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaginationResponseDto<T> {
  @Expose()
  @ApiProperty({ isArray: true })
  items: T[];

  @Expose()
  @ApiProperty()
  pages_count: number;

  @Expose()
  @ApiProperty()
  items_per_page: number;

  @Expose()
  @ApiProperty()
  current_page_items_count: number;

  @Expose()
  @ApiProperty()
  current_page: number;

  @Expose()
  @ApiProperty()
  total_items: number;
}
