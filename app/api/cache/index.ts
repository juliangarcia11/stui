import { fetchWithCache } from "./fetch-w-cache";
import { CacheInvalidator } from "./invalidator";
import { CacheManagement } from "./management";

/**
 * Module: api/cache
 *
 * This module provides a caching layer for API requests. It's designed to cache GET requests and invalidate cache entries.
 * Architecture Design Notes:
 * - The cache object from LRU is not exported directly to prevent misuse and encourage using the provided utility functions instead.
 * - This module follows the `Object Literal Pattern` to encapsulate the caching functionality and provide a clear API for interacting with the cache.
 * - The `Cache.fetch` function should be passed to the API client configuration to enable caching for API requests.
 * - The other utilities are grouped in (hopefully) intuitive namespaces.
 */
export const Cache = {
  fetch: fetchWithCache,
  Invalidate: CacheInvalidator,
  Management: CacheManagement,
};
