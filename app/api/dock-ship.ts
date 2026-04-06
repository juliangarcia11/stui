import { Config } from "~/config";
import type { WaypointActionParams } from "~/features/waypoints/types";
import { dockShip as dockShipRequest, type DockShipResponses } from "./client";
import { buildAuth, standardizeApiResponse } from "./utils";
import { CacheInvalidator } from "./cache/invalidator";

type DockShipResponse = DockShipResponses["200"]["data"];

export async function dockShip({ token, shipSymbol }: WaypointActionParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!shipSymbol?.trim().length) return Config.Errors.MissingShip;

  const response = await dockShipRequest({
    ...buildAuth(token),
    path: {
      shipSymbol,
    },
  });

  if (response.response.ok) {
    CacheInvalidator.shipCache(shipSymbol);
  }

  return standardizeApiResponse<DockShipResponse>(response);
}
