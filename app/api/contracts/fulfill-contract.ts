import { Config } from "~/config";
import { Cache } from "../cache";
import type { FulfillContractResponses } from "../client";
import { fulfillContract as fulfillContractRequest } from "../client";
import { buildAuth, standardizeApiResponse } from "../utils";

type FulfillContractResponse = FulfillContractResponses["200"]["data"];

type FulfillContractParams = {
  token: string;
  contractId: string;
};

/**
 * POST /my/contracts/{contractId}/fulfill
 * App-to-API bridge function to accept a contract.
 * Validates input parameters, makes the API request, and handles cache invalidation upon success.
 */
export async function fulfillContract({
  token,
  contractId,
}: FulfillContractParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!contractId.trim().length) return Config.Errors.MissingContractId;

  const response = await fulfillContractRequest({
    ...buildAuth(token),
    path: {
      contractId,
    },
  });

  if (response.response.ok) {
    Cache.Invalidate.agent();
    Cache.Invalidate.allAgents();
    Cache.Invalidate.allContracts();
  }

  return standardizeApiResponse<FulfillContractResponse>(response);
}
