export interface BaseResponse<T> {
  success: boolean;
  message: string;
  response_data?: T;
  errors?: any;
  paginated_data?: {
    page: number;
    size: number;
    total_data: number;
    page_count: number;
  };
}
