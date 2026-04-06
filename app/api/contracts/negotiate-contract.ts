import { Config } from "~/config";
import { Cache } from "../cache";
import {
  negotiateContract as negotiateContractRequest,
  type NegotiateContractResponses,
} from "../client";
import { buildAuth, standardizeApiResponse } from "../utils";

type NegotiateContractResponse = NegotiateContractResponses["201"]["data"];

type NegotiateContractParams = {
  token: string;
  shipSymbol: string;
};

/**
 * POST /my/ships/{shipSymbol}/negotiate/contract
 * App-to-API bridge function to negotiate a contract.
 * Validates input parameters, makes the API request, and handles cache invalidation upon success.
 */
export async function negotiateContract({
  token,
  shipSymbol,
}: NegotiateContractParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!shipSymbol.trim().length) return Config.Errors.MissingShip;

  const response = await negotiateContractRequest({
    ...buildAuth(token),
    path: {
      shipSymbol,
    },
  });

  if (response.response.ok) {
    Cache.Invalidate.agent();
    Cache.Invalidate.allAgents();
    Cache.Invalidate.allContracts();
  }

  return standardizeApiResponse<NegotiateContractResponse>(response);
}
