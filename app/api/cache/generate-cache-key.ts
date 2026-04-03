import { Config } from "~/config";
import type { FetchOptions } from "./cache";

/**
 * Generates a unique cache key based on the request URL and options.
 * It removes the base URL and includes the request options to differentiate between requests with different parameters.
 */
export const generateCacheKey = (
  input: RequestInfo | URL,
  init?: FetchOptions,
): string => {
  const url =
    typeof input === "string"
      ? input
      : input instanceof URL
        ? input.href
        : input.url;
  const options = init ? JSON.stringify(init) : "";
  let key = url.replace(Config.ApiUrl, ""); // Remove base URL
  key += options ? `:${options}` : "";
  return key;
};
