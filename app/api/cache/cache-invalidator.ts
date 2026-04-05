import { deleteCacheEntriesByPattern } from "./utils";

export const CacheInvalidator = {
  invalidateShipCache(shipSymbol: string) {
    const shipKeyPattern = `ship/${shipSymbol}`;
    deleteCacheEntriesByPattern(shipKeyPattern);
  },
  // Add more resource-specific invalidation methods as needed
};
