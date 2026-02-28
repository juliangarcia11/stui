import { Badge, Box, Button, Flex, type BadgeProps } from "@radix-ui/themes";
import { useMemo, type FC } from "react";
import type { ShipNavStatus } from "~/api/client";
import type { LoadWaypointsDataResponse } from "./loader-waypoints";

type WaypointNearestShipProps = {
  ship?: LoadWaypointsDataResponse["waypointsList"]["data"][0]["ships"][0];
};

/**
 * Displays the nearest 4 ships to a waypoint, if any are present in the system.
 * If a ship is at the waypoint, it will be highlighted in green and show "Here" instead of a distance.
 */
export const WaypointNearestShip: FC<WaypointNearestShipProps> = ({ ship }) => {
  if (!ship) return null;

  const { symbol, nav, distance } = ship;
  const { badgeText, badgeColor } = useMemo(
    () => evaluateDisplayRules(nav.status, distance),
    [nav.status, distance],
  );

  return (
    <Box asChild width="100%">
      <Button color={badgeColor} variant="outline" size="1">
        <Flex align="center" gap="2">
          {symbol} <Badge color={badgeColor}>{badgeText}</Badge>
        </Flex>
      </Button>
    </Box>
  );
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
): { badgeText: string; badgeColor: BadgeProps["color"] } {
  if (status === "DOCKED" && distance === 0) {
    return { badgeText: "Docked", badgeColor: "green" };
  }
  if (status === "IN_ORBIT" && distance === 0) {
    return { badgeText: "In Orbit", badgeColor: "blue" };
  }
  if (status === "IN_TRANSIT") {
    return { badgeText: "In Transit", badgeColor: "gray" };
  }

  return { badgeText: `${distance}u`, badgeColor: undefined };
}
