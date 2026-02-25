import { Config } from "~/config";
import type { ApiResponse } from "~/types";
import { type Agent, getMyAgent } from "./client";
import { standardizeApiResponse } from "./utils";

type AgentLoginParams = {
  symbol: string;
  token: string;
};

type AgentLoginResponse = ApiResponse<AgentLoginParams>;

/**
 * Full Agent Login Flow:
 * 1. Validate user input
 * 2. Check token via the API
 * 3. Validate agent symbol in response
 * 4. Parse return
 */
export async function loginAgent({
  symbol,
  token,
}: AgentLoginParams): Promise<AgentLoginResponse> {
  // Validate user input
  if (!symbol.trim().length) {
    return Config.Errors.MissingAgentSymbol;
  }
  if (!token.trim().length) {
    return Config.Errors.MissingToken;
  }

  // Get agent by provided token
  const response = await getMyAgent({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Validate response
  const result = standardizeApiResponse<Agent>(response);
  if (result.status === "error") return result;
  if (symbol !== result.data.symbol.toLowerCase())
    return Config.Errors.MismatchedAgentSymbol;

  // Parse result
  return {
    status: "success",
    data: {
      token,
      symbol: result.data.symbol,
    },
  };
}
