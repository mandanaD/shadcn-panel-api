export interface PaginationInterface<T> {
  pages_count: number;
  items_per_page: number;
  current_page_items_count: number;
  current_page: number;
  total_items: number;
  items: T[];
}

export interface PaginationOptions {
  limit: number;
  page: number;
}
