import { FactionSymbol, register, type RegisterResponse } from "~/client";
import type { ApiResponse } from "./types";
import { AUTH_ERR, extractApiErr, wrapErr } from "./utils";

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
    return AUTH_ERR.AGENT_SYMBOL;
  }
  if (!faction.trim().length) {
    return AUTH_ERR.FACTION;
  }

  // Register agent with the API
  const response = await register({
    body: { symbol, faction },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_SPACETRADERS_ACCOUNT_TOKEN}`,
    },
  });

  // Validate response
  if (response.error) return wrapErr(extractApiErr(response.error));
  if (!response.data) return AUTH_ERR.MISSING_DATA;

  // Parse result
  return {
    status: "success",
    data: {
      token: response.data.data.token,
      agent: response.data.data.agent,
      faction: response.data.data.faction,
      contract: response.data.data.contract,
      ships: response.data.data.ships,
    },
  };
}
