import { ObjectLiteral } from 'typeorm';

export const Order = <T extends ObjectLiteral>(
  ordering: string | undefined,
  allowedFields: (keyof T)[],
): Record<string, 'ASC' | 'DESC'> | undefined => {
  if (!ordering) return undefined;
  const isDesc = ordering.includes('-');

  const field = (isDesc ? ordering.split('-')[0] : ordering) as keyof T;

  if (!allowedFields.includes(field)) return undefined;

  return {
    [String(field)]: isDesc ? 'DESC' : 'ASC',
  };
};
