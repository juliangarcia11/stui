import type { ApiError } from "~/types";

/**
 * Util that formats success response json
 */
export const wrapSuccess = <T = unknown>(data: T) =>
  ({ status: "success", data }) as const;

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
 * Util to create a header json object to drop into the client function calls
 */
export const buildAuth = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
