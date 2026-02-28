import { getAgentInfo, getSystemInfo } from "~/api";
import { mapWaypointsWithShips, transformWaypointToSystem } from "./utils";
import { getWaypointsList } from "~/api/get-waypoints-list";

/**
 * Loads the data for the Waypoints route.
 * Fetches the agent's information, the current system's information, and a paginated list of waypoints in that system.
 *
 * @throws {Error} If fetching fails. Meant to be caught by the route's ErrorBoundary.
 */
export async function loadWaypointsData(
  token: string,
  searchParams: URLSearchParams,
) {
  const system = searchParams.get("system");
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

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

  const waypointsList = await getWaypointsList({
    token,
    systemSymbol,
    query: { page: +page, limit: +limit },
  });
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
