import { FactionSymbol, register, type RegisterResponse } from "~/client";

/**
 * Util that formats error response json
 */
const wrapErr = (message: string) => ({ status: "error", message }) as const;

/**
 * Util that pulls error messages from items we hope are ApiErrors
 */
const extractApiErr = (e: unknown) => (e as ApiError).error.message;

/**
 * Error messages for the registration handler preformatted for return
 */
const REGISTRATION_ERR = {
  AGENT_SYMBOL: wrapErr("Agent symbol is required"),
  FACTION: wrapErr("Faction is required"),
  MISSING_DATA: wrapErr("Data missing in response"),
};

type ApiError = {
  error: {
    code: number;
    message: string;
    data: unknown;
    requestId: string;
  };
};

type RegisterAgentParams = {
  symbol: string;
  faction: FactionSymbol;
};

type RegisterAgentResponse =
  | {
      status: "success";
      data: RegisterResponse["data"];
    }
  | {
      status: "error";
      message: string;
    };

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
}: RegisterAgentParams): Promise<RegisterAgentResponse> {
  // Validate user input
  if (!symbol.trim().length) {
    return REGISTRATION_ERR.AGENT_SYMBOL;
  }
  if (!faction.trim().length) {
    return REGISTRATION_ERR.FACTION;
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
  if (!response.data) return REGISTRATION_ERR.MISSING_DATA;

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
