import { CacheManagement } from "./management";

export const CacheInvalidator = {
  /**
   * Invalidates all cache entries with `my/agent` in their key.
   */
  agent() {
    CacheManagement.deleteEntriesByPattern("my/agent");
  },

  /**
   * Invalidates all cache entries with `agents` in their key.
   */
  allAgents() {
    CacheManagement.deleteEntriesByPattern("agents");
  },

  /**
   * Invalidates all cache entries with `my/contracts` in their key.
   */
  allContracts() {
    CacheManagement.deleteEntriesByPattern("my/contracts");
  },

  /**
   * Invalidates all cache entries with `my/ships` in their key.
   */
  allShips() {
    CacheManagement.deleteEntriesByPattern("my/ships");
  },

  /**
   * Invalidates cache entries with `ship/{shipSymbol}` in their key.
   * @param shipSymbol
   */
  shipCache(shipSymbol: string) {
    const shipKeyPattern = `ship/${shipSymbol}`;
    CacheManagement.deleteEntriesByPattern(shipKeyPattern);
  },
};
