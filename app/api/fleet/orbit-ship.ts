import { Config } from "~/config";
import type { WaypointActionParams } from "~/features/waypoints/types";
import { Cache } from "../cache/";
import type { OrbitShipResponses } from "../client";
import { orbitShip as orbitShipRequest } from "../client";
import { buildAuth, standardizeApiResponse } from "../utils";

type OrbitShipResponse = OrbitShipResponses["200"]["data"];

export async function orbitShip({ token, shipSymbol }: WaypointActionParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!shipSymbol?.trim().length) return Config.Errors.MissingShip;

  const response = await orbitShipRequest({
    ...buildAuth(token),
    path: {
      shipSymbol,
    },
  });

  if (response.response.ok) {
    Cache.Invalidate.shipCache(shipSymbol);
  }

  return standardizeApiResponse<OrbitShipResponse>(response);
}
