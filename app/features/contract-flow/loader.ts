import type { Waypoint } from "~/api/client";
import { API } from "~/api";
import { transformWaypointToSystem } from "~/features/waypoints";
import type { ContractFlowContext } from "./types";

const MINING_MOUNT_PREFIXES = [
  "MOUNT_MINING_LASER_I",
  "MOUNT_MINING_LASER_II",
  "MOUNT_MINING_LASER_III",
] as const;

export async function loadContractFlowContext(
  token: string,
): Promise<ContractFlowContext | null> {
  const agentInfo = await API.Agent.getAgentInfo(token);
  if (agentInfo.status === "error") return null;

  const { agent, contracts, ships } = agentInfo.data;

  const contract = contracts.find((c) => !c.fulfilled) ?? null;
  if (!contract) return null;

  const miningShip =
    ships.find((s) =>
      s.mounts?.some((m) =>
        (MINING_MOUNT_PREFIXES as readonly string[]).includes(m.symbol),
      ),
    ) ?? null;

  const systemSymbol = transformWaypointToSystem(agent.headquarters);

  const waypointsResult = await API.Systems.getWaypointsList({
    token,
    systemSymbol,
  });
  const waypoints: Waypoint[] =
    waypointsResult.status === "success" ? waypointsResult.data.data : [];

  return { contract, ship: miningShip, agent, waypoints, systemSymbol };
}
