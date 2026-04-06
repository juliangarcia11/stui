import { Config } from "~/config";
import { getMyAgent, type Agent } from "../client";
import { buildAuth, standardizeApiResponse } from "../utils";

/**
 * Get Agent, Contracts, and Ships in a parallel request
 */
export async function getAgent(token: string) {
  // Validate user input
  if (!token.trim().length) {
    return Config.Errors.MissingToken;
  }

  const response = await getMyAgent(buildAuth(token));
  return standardizeApiResponse<Agent>(response);
}
