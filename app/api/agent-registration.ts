import { Config } from "~/config";
import type { ApiResponse } from "~/types";
import { FactionSymbol, register, type RegisterResponse } from "./client";
import { standardizeApiResponse } from "./utils";

type AgentRegistrationParams = {
  symbol: string;
  faction: FactionSymbol;
};

type AgentRegistrationResponse = ApiResponse<RegisterResponse["data"]>;

/**
 * Full Agent Registration Flow:
 * 1. Validate user input
 * 2. Register with the API
 * 3. Validate response
 * 4. Parse return
 */
export async function registerAgent({
  symbol,
  faction,
}: AgentRegistrationParams): Promise<AgentRegistrationResponse> {
  // Validate user input
  if (!symbol.trim().length) {
    return Config.Errors.MissingAgentSymbol;
  }
  if (!faction.trim().length) {
    return Config.Errors.MissingFaction;
  }

  // Register agent with the API
  const response = await register({
    body: { symbol, faction },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_SPACETRADERS_ACCOUNT_TOKEN}`,
    },
  });

  return standardizeApiResponse<RegisterResponse["data"]>(response);
}
