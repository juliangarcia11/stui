// ===================================================================================
// ===================================================================================
// Shared Types: extract into grouped files once we hit a few handfuls of types
// ===================================================================================
// ===================================================================================

/**
 * Structure of the error object returned by hey-api client & the SpaceTraders API
 */
export type ApiError = {
  error: {
    code: number;
    message: string;
    data: unknown;
    requestId: string;
  };
};

/**
 * Our structure with a distinct status flag to denote success & error responses
 */
export type ApiResponse<T> =
  | {
      status: "success";
      data: T;
    }
  | {
      status: "error";
      message: string;
    };
