import { Config } from "~/config";
import { cache } from "./cache";

/**
 * Generates a unique cache key based on the request URL and options.
 * It removes the base URL and includes the request options to differentiate between requests with different parameters.
 */
export const generateCacheKey = (
  input: RequestInfo | URL,
  init?: RequestInit,
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

/**
 * Utility function to get a dump of the current cache entries.
 * Returns an array of [key, value]. This is useful for debugging
 * and inspecting the contents of the cache.
 *
 * Purposely not exporting full cache object from this module
 */
export const getCacheDump = () => {
  return cache.dump();
};

/**
 * Utility function to get the current size of the cache (number of entries).
 * This is useful for monitoring the cache usage and ensuring that it does not exceed the defined limits.
 *
 * Purposely not exporting full cache object from this module
 */
export const getCacheSize = () => {
  return cache.size;
};
