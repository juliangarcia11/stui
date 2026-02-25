import type { ApiResponse } from "~/types";
import { getStatus, type GetStatusResponse } from "./client";
import { standardizeApiResponse } from "./utils";

type ApiStatusResponse = ApiResponse<GetStatusResponse>;

/**
 * Get the status of the API and prepare the response for the UI
 */
export async function getApiStatus(): Promise<ApiStatusResponse> {
  const response = await getStatus();

  return standardizeApiResponse<GetStatusResponse>(response);
}
