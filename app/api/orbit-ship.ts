import { Config } from "~/config";
import type { WaypointActionParams } from "~/features/waypoints/types";
import type { OrbitShipResponses } from "./client";
import { orbitShip as orbitShipRequest } from "./client";
import { buildAuth, standardizeApiResponse } from "./utils";
import { CacheInvalidator } from "./cache/invalidator";

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
    CacheInvalidator.shipCache(shipSymbol);
  }

  return standardizeApiResponse<OrbitShipResponse>(response);
}
