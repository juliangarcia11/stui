import { Config } from "~/config";
import { transformWaypointToSystem } from "~/features/waypoints";
import { getMarket, type Market } from "./client";
import { buildAuth, standardizeApiResponse } from "./utils";

type GetMarketParams = {
  token: string;
  waypointSymbol: string;
};

export async function getMarketData({
  token,
  waypointSymbol,
}: GetMarketParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!waypointSymbol.trim().length) return Config.Errors.MissingWaypoint;

  const systemSymbol = transformWaypointToSystem(waypointSymbol);
  const response = await getMarket({
    ...buildAuth(token),
    path: {
      systemSymbol,
      waypointSymbol,
    },
  });

  return standardizeApiResponse<Market>(response);
}
