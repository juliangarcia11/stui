import { log } from "~/utils";
import { cache } from "./cache";
import { generateCacheKey } from "./utils";

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
  init?: RequestInit,
): Promise<Response> => {
  // if not a GET request, bypass cache and perform normal fetch
  if (init?.method && init.method.toUpperCase() !== "GET") {
    return fetch(input, init);
  }

  const cacheKey = generateCacheKey(input, init);

  // Check if the response is in the cache
  const cached = cache.get(cacheKey);
  if (cached) {
    log({ key: "CACHE", message: `[HIT][${cached.count ?? 0}][${cacheKey}]` });
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
