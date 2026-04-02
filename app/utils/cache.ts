import { LRUCache } from "lru-cache";
import { Config } from "~/config";
import { log } from "./log";

/**
 * Module: cache.ts
 * Description: Implements a caching mechanism for GET fetch requests using lru-cache.
 * It generates unique cache keys based on the request URL and options, and stores successful responses in the cache.
 * Limitations:
 * - The cache does not currently implement a time-to-live (TTL) or eviction policy based on age, so cached entries will persist until the cache limit is reached.
 * - Cache busting is not yet implemented, so there is no way to force a new request when needed.
 * - The cache is in-memory & global, not per user or per session; not really production worthy but should be fine for development and testing purposes.
 *
 * WIP
 *
 * TODO:
 * - Implement cache busting mechanism so actions can purposely force a new request when needed
 */

type FetchOptions = RequestInit | undefined;
type CacheKey = string;
type CacheEntry = {
  body: Blob; // Store the body as a Blob
  init: ResponseInit; // Store the ResponseInit to recreate the Response
  timestamp: number;
  count?: number; // Optional count for tracking usage
};

// Configure the cache
const cache = new LRUCache<CacheKey, CacheEntry>({
  max: 100, // Maximum number of items in the cache
  // ttl: 1000 * 60 * 5, // Time-to-live in milliseconds (5 minutes)
});

/**
 * Generates a unique cache key based on the request URL and options.
 * It removes the base URL and includes the request options to differentiate between requests with different parameters.
 */
const generateCacheKey = (
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

/**
 * Custom fetch function that implements caching for GET requests using lru-cache.
 * If the request is not a GET request, it bypasses the cache and performs a normal fetch.
 * If the request is a GET request, it checks if a response for the given request is already cached and returns it if available.
 * If not, it performs the fetch, caches the successful response, and returns it.
 * The cache key is generated based on the request URL and options to ensure that different requests are cached separately.
 *
 * Cache busting not yet implemented.
 */
export const fetchWithCache: typeof fetch = async (
  input: RequestInfo | URL,
  init?: FetchOptions,
): Promise<Response> => {
  // if not a GET request, bypass cache and perform normal fetch
  if (init?.method && init.method.toUpperCase() !== "GET") {
    return fetch(input, init);
  }

  const cacheKey = generateCacheKey(input, init);

  // Check if the response is in the cache
  const cached = cache.get(cacheKey);
  if (cached) {
    log({ key: "CACHE", message: `[HIT - ${cached.count ?? 0}][${cacheKey}]` });
    cache.set(cacheKey, { ...cached, count: (cached.count || 0) + 1 }); // Update usage count

    // Recreate the Response object from the cached body and init
    return new Response(cached.body, cached.init);
  }

  // If not cached, perform the fetch
  const response = await fetch(input, init);

  // Cache the response if it's successful
  if (response.ok) {
    const body = await response.blob(); // Read the body as a Blob
    const init: ResponseInit = {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()), // Clone headers
    };

    cache.set(cacheKey, { body, init, timestamp: Date.now() });
    log({ key: "CACHE", message: `[STORE][${cacheKey}]` });

    // Return a new Response object since the body has been consumed
    return new Response(body, init);
  }

  return response;
};
