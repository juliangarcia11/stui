import { Config } from "~/config";
import {
  getSystemWaypoints,
  type GetSystemWaypointsData,
  type Waypoint,
} from "./client";
import { buildAuth, standardizeListApiResponse } from "./utils";

type GetSystemInfoParams = {
  token: string;
  systemSymbol: string;
} & {
  query?: GetSystemWaypointsData["query"];
};

export async function getWaypointsList({
  token,
  systemSymbol,
  query,
}: GetSystemInfoParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!systemSymbol.trim().length) return Config.Errors.MissingSystem;

  const response = await getSystemWaypoints({
    ...buildAuth(token),
    path: {
      systemSymbol,
    },
    query,
  });

  return standardizeListApiResponse<Waypoint>(response);
}
