import { log } from "~/utils";
import { cache } from "./cache";

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

/**
 * Utility function to clear all entries from the cache.
 */
export const clearCache = () => {
  log({ key: "CACHE", message: "Clearing cache" });
  cache.clear();
};

/**
 * Utility function to delete a specific cache entry by its key.
 * Returns true if the entry was deleted, false if it was not found.
 */
export const deleteCacheEntry = (key: string) => {
  log({ key: "CACHE", message: `Deleting cache entry for key: ${key}` });
  return cache.delete(key);
};

export const deleteCacheEntriesByPattern = (pattern: string) => {
  let somethingDeleted = false;
  Array.from(cache.entries()).forEach(([key]) => {
    if (key.includes(pattern)) {
      cache.delete(key);
      somethingDeleted = true;
      log({ key: "CACHE", message: `Deleted cache entry for key: ${key}` });
    }
  });

  if (!somethingDeleted) {
    log({
      key: "CACHE",
      message: `No cache entries found matching pattern: ${pattern}`,
    });
  }
};
