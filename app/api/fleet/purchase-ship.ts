import { Config } from "~/config";
import {
  purchaseShip as purchaseShipRequest,
  type PurchaseShipResponses,
  type ShipType,
} from "../client";
import { Cache } from "../cache";
import { buildAuth, standardizeApiResponse } from "../utils";

type PurchaseShipResponse = PurchaseShipResponses["201"]["data"];

type PurchaseShipParams = {
  token: string;
  shipType: ShipType;
  waypointSymbol: string;
};

export async function purchaseShip({
  token,
  shipType,
  waypointSymbol,
}: PurchaseShipParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!waypointSymbol.trim().length) return Config.Errors.MissingWaypoint;

  const response = await purchaseShipRequest({
    ...buildAuth(token),
    body: { shipType, waypointSymbol },
  });

  if (response.response.ok) {
    Cache.Invalidate.allShips();
    Cache.Invalidate.agent();
    Cache.Invalidate.allAgents();
  }

  return standardizeApiResponse<PurchaseShipResponse>(response);
}
