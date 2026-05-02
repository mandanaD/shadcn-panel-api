import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersQueryDto {
  @ApiPropertyOptional({
    description: 'Search in first_name, last_name, or email',
  })
  search?: string;

  @ApiPropertyOptional({
    description: 'Order by created_at. Use -created_at for descending',
  })
  ordering?: string;
}
