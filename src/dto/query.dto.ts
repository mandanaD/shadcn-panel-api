import { PaginationDto } from '../common/query/dto/pagination.dto';
import { SearchDto } from '../common/query/dto/search.dto';
import { IntersectionType } from '@nestjs/swagger';
import { OrderDto } from '../common/query/dto/order.dto';

export class QueryDto extends IntersectionType(
  PaginationDto,
  OrderDto,
  SearchDto,
) {}
