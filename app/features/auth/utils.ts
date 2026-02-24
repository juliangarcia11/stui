import type { ApiError } from "./types";

/**
 * Util that formats error response json
 */
export const wrapErr = (message: string) =>
  ({ status: "error", message }) as const;

/**
 * Util that pulls error messages from items we hope are ApiErrors
 */
export const extractApiErr = (e: unknown) => (e as ApiError).error.message;

/**
 * Error messages preformatted for return
 */
export const AUTH_ERR = {
  AGENT_SYMBOL: wrapErr("Agent symbol is required"),
  FACTION: wrapErr("Faction is required"),
  MISSING_DATA: wrapErr("Data missing in response"),
  SYMBOL_MISMATCH: wrapErr("Agent symbol provided does not match token"),
  TOKEN: wrapErr("Token is required"),
};
