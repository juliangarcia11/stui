import type { Waypoint } from "~/api/client";
import { API } from "~/api";
import { FleetApi } from "~/api/fleet";
import { transformWaypointToSystem } from "~/features/waypoints";
import type { ContractFlowContext, ShipCooldown, ShipOption } from "./types";

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

  let shipOptions: ShipOption[] = [];
  if (!miningShip) {
    const shipyardWaypoints = waypoints.filter((w) =>
      w.traits.some((t) => t.symbol === "SHIPYARD"),
    );
    const shipyardResults = await Promise.all(
      shipyardWaypoints.map((w) =>
        API.Systems.getShipyard({ token, waypointSymbol: w.symbol }),
      ),
    );
    shipOptions = shipyardResults.flatMap((result, i) => {
      if (result.status !== "success") return [];
      return (result.data.ships ?? [])
        .filter((s) =>
          s.mounts.some((m) =>
            (MINING_MOUNT_PREFIXES as readonly string[]).some((prefix) =>
              m.symbol.startsWith(prefix),
            ),
          ),
        )
        .map((s) => ({
          waypointSymbol: shipyardWaypoints[i]!.symbol,
          shipType: s.type,
          name: s.name,
          purchasePrice: s.purchasePrice,
        }));
    });
  }

  let shipCooldown: ShipCooldown | null = null;
  if (miningShip) {
    const cooldownResult = await FleetApi.getShipCooldown({
      token,
      shipSymbol: miningShip.symbol,
    });
    if (cooldownResult.status === "success" && cooldownResult.data) {
      shipCooldown = cooldownResult.data;
    }
  }

  return { contract, ship: miningShip, agent, waypoints, systemSymbol, shipOptions, shipCooldown };
}
