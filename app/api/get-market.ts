// File Purpose: App to API standardized bridge
import { Config } from "~/config";
import { transformWaypointToSystem } from "~/features/waypoints";
import { getMarket as get, type Market } from "./client";
import { buildAuth, standardizeApiResponse } from "./utils";

type GetMarketParams = {
  token: string;
  waypointSymbol: string;
};

export async function getMarket({ token, waypointSymbol }: GetMarketParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!waypointSymbol.trim().length) return Config.Errors.MissingWaypoint;

  const systemSymbol = transformWaypointToSystem(waypointSymbol);
  const response = await get({
    ...buildAuth(token),
    path: {
      systemSymbol,
      waypointSymbol,
    },
  });

  return standardizeApiResponse<Market>(response);
}
