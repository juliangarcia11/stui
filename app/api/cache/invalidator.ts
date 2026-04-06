import { CacheManagement } from "./management";

export const CacheInvalidator = {
  shipCache(shipSymbol: string) {
    const shipKeyPattern = `ship/${shipSymbol}`;
    CacheManagement.deleteEntriesByPattern(shipKeyPattern);
  },
  // Add more resource-specific invalidation methods as needed
};
