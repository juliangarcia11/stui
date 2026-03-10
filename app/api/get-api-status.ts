import { getStatus, type GetStatusResponse } from "./client";
import { standardizeApiResponse } from "./utils";

/**
 * Get the status of the API and prepare the response for the UI
 */
export async function getApiStatus() {
  const response = await getStatus();

  return standardizeApiResponse<GetStatusResponse>(response, (res) => res.data);
}
