export interface BaseApiResponse<T> {
  data?: T;
  message: string;
}

export interface PaginatedResponse<T> extends BaseApiResponse<T> {
  total: number;
  page: number;
  pageSize: number;
}

export interface ErrorResponse {
  errors: string;
}
