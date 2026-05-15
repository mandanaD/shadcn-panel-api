import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { Search } from './search';
import { Order } from './order';
import { Paginate } from './paginate';
import { QueryOptions } from '../type/query.interface';

export const applyQueryOptions = <T extends ObjectLiteral>(
  query: SelectQueryBuilder<T>,
  options: QueryOptions<T>,
) => {
  const where = Search<T>(options.search, options.searchFields);

  if (where) {
    query.where(where);
  }
  const order = Order<T>(options.ordering, options.orderFields);

  if (order) {
    query.orderBy(order);
  }

  return Paginate(query, {
    page: options.page,
    limit: options.limit,
  });
};