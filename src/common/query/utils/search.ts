import { FindOptionsWhere, ILike, ObjectLiteral } from 'typeorm';

// this FindOptionsWhere typeorm type is for building where query
// so typeorm expect the type of where be FindOptionsWhere<User>
// ObjectLiteral is obj but a entity
export const Search = <T extends ObjectLiteral>(
  search: string | undefined,
  allowedFields: (keyof T)[],
  filterWhere?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
): FindOptionsWhere<T>[] | undefined => {
  const baseFilters = Array.isArray(filterWhere)
    ? filterWhere
    : filterWhere
      ? [filterWhere]
      : [{}];

  if (!search?.trim()) return baseFilters;

  const term = `%${search.trim()}%`;

  const conditions: FindOptionsWhere<T>[] = [];

  for (const base of baseFilters) {
    for (const field of allowedFields) {
      conditions.push({
        ...base,
        [field]: ILike(term),
      } as FindOptionsWhere<T>);
    }
  }
  // [
  //   { isActive: true, name: ILike("%ali%") },
  //   { isActive: true, email: ILike("%ali%") }
  // ]

  return conditions;
};
