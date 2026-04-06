import { acceptContract } from "./accept-contract";
import { fulfillContract } from "./fulfill-contract";
import { negotiateContract } from "./negotiate-contract";

/**
 * Contract-related API functions.
 * Each function corresponds to a specific contract-related API endpoint and handles the necessary request and response processing.
 */
export const ContractsApi = {
  acceptContract,
  fulfillContract,
  negotiateContract,
};
