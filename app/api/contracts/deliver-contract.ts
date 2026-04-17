import { Config } from "~/config";
import {
  deliverContract as deliverContractRequest,
  type DeliverContractResponses,
} from "../client";
import { Cache } from "../cache";
import { buildAuth, standardizeApiResponse } from "../utils";

type DeliverContractResponse = DeliverContractResponses["200"]["data"];

type DeliverContractParams = {
  token: string;
  contractId: string;
  shipSymbol: string;
  tradeSymbol: string;
  units: number;
};

export async function deliverContract({
  token,
  contractId,
  shipSymbol,
  tradeSymbol,
  units,
}: DeliverContractParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!contractId.trim().length) return Config.Errors.MissingContractId;
  if (!shipSymbol.trim().length) return Config.Errors.MissingShip;

  const response = await deliverContractRequest({
    ...buildAuth(token),
    path: { contractId },
    body: { shipSymbol, tradeSymbol, units },
  });

  if (response.response.ok) {
    Cache.Invalidate.allContracts();
    Cache.Invalidate.shipCache(shipSymbol);
  }

  return standardizeApiResponse<DeliverContractResponse>(response);
}
