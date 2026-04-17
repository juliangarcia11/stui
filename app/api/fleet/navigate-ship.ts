import { Config } from "~/config";
import {
  navigateShip as navigateShipRequest,
  type NavigateShipResponses,
} from "../client";
import { Cache } from "../cache";
import { buildAuth, standardizeApiResponse } from "../utils";

type NavigateShipResponse = NavigateShipResponses["200"]["data"];

type NavigateShipParams = {
  token: string;
  shipSymbol: string;
  waypointSymbol: string;
};

export async function navigateShip({
  token,
  shipSymbol,
  waypointSymbol,
}: NavigateShipParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!shipSymbol.trim().length) return Config.Errors.MissingShip;
  if (!waypointSymbol.trim().length) return Config.Errors.MissingWaypoint;

  const response = await navigateShipRequest({
    ...buildAuth(token),
    path: { shipSymbol },
    body: { waypointSymbol },
  });

  if (response.response.ok) {
    Cache.Invalidate.shipCache(shipSymbol);
  }

  return standardizeApiResponse<NavigateShipResponse>(response);
}
