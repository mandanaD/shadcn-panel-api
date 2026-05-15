export interface pagination<T> {
  pages_count: number;
  items_per_page: number;
  current_page_items_count: number;
  current_page: number;
  total_items: number;
  items: T[];
}

export interface PaginationOptions {
  limit?: number;
  page?: number;
}
export interface QueryOptions<T> {
  search?: string;
  searchFields: (keyof T)[];
  ordering?: string;
  orderFields: (keyof T)[];
  page?: number;
  limit?: number;
}
