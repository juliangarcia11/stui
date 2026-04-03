import { LRUCache } from "lru-cache";
import { log } from "~/utils";

type CacheKey = string;
type CacheEntry = {
  body: Blob; // Store the body as a Blob
  init: ResponseInit; // Store the ResponseInit to recreate the Response
  timestamp: number;
  count?: number; // Optional count for tracking usage
};

declare global {
  var __apiCache: LRUCache<CacheKey, CacheEntry> | undefined;
}

const createCache = () => {
  log({ key: "CACHE", message: "Creating new cache instance" });
  return new LRUCache<CacheKey, CacheEntry>({
    max: 100, // Maximum number of items in the cache
    // ttl: 1000 * 60 * 5, // Time-to-live in milliseconds (5 minutes)
  });
};

// In developement, reuse existing instance if it survived HMR, otherwise create fresh
// In production, create a new instance
export const cache =
  import.meta.env.DEV && globalThis.__apiCache
    ? globalThis.__apiCache
    : (globalThis.__apiCache = createCache());
