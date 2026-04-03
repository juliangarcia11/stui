/**
 * Module: api/cache
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

export { getCacheDump, getCacheSize } from "./utils";
export { fetchWithCache } from "./fetch-w-cache";

// Note: cache object is not exported directly to prevent misuse and encourage using the provided utility functions instead.
// This allows for better encapsulation and control over how the cache is accessed and modified.
