export interface BaseApiResponse<T> {
  data?: T;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  paging: {
    current_page: number;
    size: number;
    total_page: number;
  };
}

export interface ErrorResponse {
  errors: string;
}
