import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { pagination, PaginationOptions } from '../type/query.interface';

export const Paginate = async <T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  options: PaginationOptions,
): Promise<pagination<T>> => {
  const limit = options.limit || 10;
  const page = options.page || 1;

  const skip = (page - 1) * limit;

  const [data, total] = await queryBuilder
    .skip(skip)
    .take(limit)
    .getManyAndCount();

  return {
    items: data,
    current_page: page,
    current_page_items_count: data?.length,
    items_per_page: limit,
    pages_count: Math.ceil(total / limit),
    total_items: total,
  };
};
