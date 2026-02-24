import { getMyAgent } from "~/client";
import { Config } from "~/config";
import type { ApiResponse } from "~/types";
import { extractApiErr, wrapErr } from "~/utils";

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
  if (response.error) return wrapErr(extractApiErr(response.error));
  if (!response.data) return Config.Errors.MissingData;
  if (symbol !== response.data.data.symbol.toLowerCase())
    return Config.Errors.MismatchedAgentSymbol;

  // Parse result
  return {
    status: "success",
    data: {
      token,
      symbol: response.data.data.symbol,
    },
  };
}
