import { log } from "~/utils";
import { cache } from "./cache";

/**
 * Get a dump of the current cache entries.
 * @returns An array of [key, value] pairs representing the cache contents.
 */
const getDump = () => {
  return cache.dump();
};

/**
 * Get the current number of entries in the cache.
 * Note: This does not reflect the total memory usage of the cache, just the count of entries.
 * @returns The number of entries currently in the cache.
 */
const getSize = () => {
  return cache.size;
};

/**
 * Clear all entries from the cache.
 * This will remove all cached responses and reset the cache to an empty state.
 */
const clear = () => {
  log({ key: "CACHE", message: "Clearing cache" });
  cache.clear();
};

/**
 * Delete a specific cache entry by its key.
 * This allows for targeted invalidation of cache entries when they are no longer valid or needed.
 * @param key - The unique key identifying the cache entry to be deleted.
 * @returns A boolean indicating whether the entry was successfully deleted (true) or not found (false).
 */
const deleteEntry = (key: string) => {
  log({ key: "CACHE", message: `Deleting cache entry for key: ${key}` });
  return cache.delete(key);
};

/**
 * Delete cache entries that match a specific pattern in their keys.
 * This is useful for invalidating groups of cache entries that share a common identifier in their keys (e.g. all entries related to a specific API endpoint).
 * @param pattern - A string pattern to match against cache keys. All entries with keys that include this pattern will be deleted.
 */
const deleteEntriesByPattern = (pattern: string) => {
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

export const CacheManagement = {
  getDump,
  getSize,
  clear,
  deleteEntry,
  deleteEntriesByPattern,
};
