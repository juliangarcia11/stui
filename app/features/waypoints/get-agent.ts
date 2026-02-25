import { getMyAgent, type Agent } from "~/client";
import { Config } from "~/config";
import type { ApiResponse } from "~/types";
import { buildAuth, standardizeApiResponse } from "~/utils";

type GetAgentResponse = ApiResponse<Agent>;

/**
 * Get Agent, Contracts, and Ships in a parallel request
 */
export async function getAgent(token: string): Promise<GetAgentResponse> {
  // Validate user input
  if (!token.trim().length) {
    return Config.Errors.MissingToken;
  }

  const response = await getMyAgent(buildAuth(token));
  return standardizeApiResponse<Agent>(response);
}
