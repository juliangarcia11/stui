import { Config } from "~/config";
import type { ApiResponse } from "~/types";
import {
  getSystemWaypoints,
  type GetSystemWaypointsData,
  type GetSystemWaypointsResponses,
  type System,
} from "./client";
import { buildAuth, standardizeApiResponse } from "./utils";

type GetSystemInfoParams = {
  token: string;
  systemSymbol: string;
} & {
  query?: GetSystemWaypointsData["query"];
};

export type WaypointsList = GetSystemWaypointsResponses["200"];
type GetWaypointListResponse = ApiResponse<WaypointsList>;

export async function getWaypointsList({
  token,
  systemSymbol,
  query,
}: GetSystemInfoParams): Promise<GetWaypointListResponse> {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!systemSymbol.trim().length) return Config.Errors.MissingSystem;

  const response = await getSystemWaypoints({
    ...buildAuth(token),
    path: {
      systemSymbol,
    },
    query,
  });

  return standardizeApiResponse<WaypointsList>(response);
}
