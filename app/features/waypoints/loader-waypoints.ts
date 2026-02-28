import { getAgentInfo, getSystemInfo } from "~/api";
import { mapWaypointsWithShips, transformWaypointToSystem } from "./utils";
import { getWaypointsList } from "~/api/get-waypoints-list";

/**
 * Loads the data for the Waypoints route.
 *
 * **Note:** The `getSystemInfo` returns a list of waypoint summaries, not the full waypoint details.
 * When/if that detail data is needed, we'll need to make additional API calls to fetch the full details for each waypoint or a page of waypoints.
 *
 * @throws {Error} If fetching fails. Meant to be caught by the route's ErrorBoundary.
 */
export async function loadWaypointsData(
  token: string,
  searchParams: URLSearchParams,
) {
  const system = searchParams.get("system");
  const agentInfo = await getAgentInfo(token);
  if (agentInfo.status === "error") {
    throw new Error(`Failed to fetch agent info: ${agentInfo.message}`);
  }

  const systemSymbol = system?.length
    ? system
    : transformWaypointToSystem(agentInfo.data.agent.headquarters);
  const systemInfo = await getSystemInfo({ token, systemSymbol });
  if (systemInfo.status === "error") {
    throw new Error(`Failed to fetch system info: ${systemInfo.message}`);
  }

  const waypointsList = await getWaypointsList({ token, systemSymbol });
  if (waypointsList.status === "error") {
    throw new Error(`Failed to fetch waypoints list: ${waypointsList.message}`);
  }

  // TODO:
  //   - map system waypoints to include agent's contracts at each waypoint

  return {
    agentInfo: agentInfo.data,
    systemInfo: systemInfo.data,
    waypointsList: {
      data: mapWaypointsWithShips(
        waypointsList.data.data,
        agentInfo.data.ships,
      ),
      meta: waypointsList.data.meta,
    },
  };
}

export type LoadWaypointsDataResponse = Awaited<
  ReturnType<typeof loadWaypointsData>
>;
