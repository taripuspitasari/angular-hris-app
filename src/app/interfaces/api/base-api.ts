export interface BaseApi<T> {
  data?: T;
  message: string;
}

export interface PaginatedApi<T> {
  data: T[];
  paging: {
    current_page: number;
    size: number;
    total_page: number;
  };
}
