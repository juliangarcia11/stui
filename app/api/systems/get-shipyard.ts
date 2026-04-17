import { Config } from "~/config";
import { getShipyard as getShipyardRequest, type Shipyard } from "../client";
import { transformWaypointToSystem } from "~/features/waypoints";
import { buildAuth, standardizeApiResponse } from "../utils";

type GetShipyardParams = {
  token: string;
  waypointSymbol: string;
};

export async function getShipyard({ token, waypointSymbol }: GetShipyardParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!waypointSymbol.trim().length) return Config.Errors.MissingWaypoint;

  const systemSymbol = transformWaypointToSystem(waypointSymbol);

  const response = await getShipyardRequest({
    ...buildAuth(token),
    path: { systemSymbol, waypointSymbol },
  });

  return standardizeApiResponse<Shipyard>(response);
}
