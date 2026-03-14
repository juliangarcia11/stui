import { type BadgeProps } from "@radix-ui/themes";
import { useMemo, type FC } from "react";
import type { ShipNavStatus } from "~/api/client";
import type { UIWaypoint } from "../types";
import { WaypointPoiButton, WaypointPoiNavButton } from "./WaypointPoiButton";

type WaypointNearestShipProps = {
  ship?: UIWaypoint["ships"][0];
};

/**
 * Displays the nearest ship to a waypoint, if any are present in the system.
 * If a ship is at the waypoint, it will be highlighted in blue or green depending on it's docked/orbiting status,
 * and clicking on it will open the corresponding action dialog (e.g. "Orbit Ship" or "Dock Ship").
 */
export const WaypointNearestShip: FC<WaypointNearestShipProps> = ({ ship }) => {
  if (!ship) return null;

  const { symbol, nav, distance } = ship;
  const { action, badgeText, badgeColor } = useMemo(
    () => evaluateDisplayRules(nav.status, distance),
    [nav.status, distance],
  );

  const params = {
    text: symbol,
    badge: badgeText,
    color: badgeColor,
  };

  // Render non-interactive button if no action is available for the ship's current status
  if (!action) {
    return <WaypointPoiButton {...params} />;
  }

  // Render nav button to open action dialog via URL params
  const search = `?action=${action}&waypoint=${nav.waypointSymbol}&ship=${symbol}`;
  return <WaypointPoiNavButton {...params} to={{ search }} />;
};

/**
 * Display Rules:
 * - If the ship is DOCKED at the current waypoint, the badge should be green and say "Docked"
 * - If the ship is IN_ORBIT at the current waypoint, the badge should be blue and say "In Orbit"
 * - If the ship is IN_TRANSIT, the badge should be gray and say "In Transit"
 * - If the ship is not at the current waypoint, the badge should be the default color and show the distance in units (e.g. "500u")
 */
function evaluateDisplayRules(
  status: ShipNavStatus,
  distance: number,
): { action?: string; badgeText: string; badgeColor: BadgeProps["color"] } {
  if (status === "DOCKED" && distance === 0) {
    return { action: "ORBIT_SHIP", badgeText: "Docked", badgeColor: "green" };
  }
  if (status === "IN_ORBIT" && distance === 0) {
    return { action: "DOCK_SHIP", badgeText: "In Orbit", badgeColor: "blue" };
  }
  if (status === "IN_TRANSIT") {
    return { badgeText: "In Transit", badgeColor: "gray" };
  }

  return { badgeText: `${distance}u`, badgeColor: undefined };
}
