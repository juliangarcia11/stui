import { getStatus, type GetStatusResponse } from "~/client";
import { Config } from "~/config";
import type { ApiResponse } from "~/types";
import { extractApiErr, wrapErr, wrapSuccess } from "~/utils";

type ApiStatusResponse = ApiResponse<GetStatusResponse>;

/**
 * Get the status of the API and prepare the response for the UI
 */
export async function getApiStatus(): Promise<ApiStatusResponse> {
  const response = await getStatus();

  if (response.error) return wrapErr(extractApiErr(response.error));
  if (!response.data) return Config.Errors.MissingData;

  return wrapSuccess(response.data);
}
