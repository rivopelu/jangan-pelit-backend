import type { BaseResponse } from "../types/response/base-response";

export class responseHelper {
  static success(message?: string): BaseResponse<null> {
    return { success: true, message: message || "ok" };
  }

  static data<T>(data: T, message: string = "success"): BaseResponse<T> {
    return { success: true, message, response_data: data };
  }

  static paginated<T>(
    data: T,
    totalData: number,
    page: number,
    size: number,
    message: string = "success",
  ): BaseResponse<T> {
    return {
      success: true,
      message,
      response_data: data,
      paginated_data: {
        page,
        size,
        total_data: totalData,
        page_count: Math.ceil(totalData / size),
      },
    };
  }

  static error(message: string, status: number): BaseResponse<null> {
    return { success: false, message };
  }
}
