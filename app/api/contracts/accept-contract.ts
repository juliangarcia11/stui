import { Config } from "~/config";
import type { AcceptContractResponses } from "../client";
import { acceptContract as acceptContractRequest } from "../client";
import { buildAuth, standardizeApiResponse } from "../utils";
import { Cache } from "../cache";

type AcceptContractResponse = AcceptContractResponses["200"]["data"];

type AcceptContractParams = {
  token: string;
  contractId: string;
};

/**
 * POST /my/contracts/{contractId}/accept
 * App-to-API bridge function to accept a contract.
 * Validates input parameters, makes the API request, and handles cache invalidation upon success.
 */
export async function acceptContract({
  token,
  contractId,
}: AcceptContractParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!contractId.trim().length) return Config.Errors.MissingContractId;

  const response = await acceptContractRequest({
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

  return standardizeApiResponse<AcceptContractResponse>(response);
}
