import { Flex } from "@radix-ui/themes";
import type { FC } from "react";
import type { LoadWaypointsDataResponse } from "./loader-waypoints";
import { WaypointNearestShip } from "./WaypointNearestShip";
import { WaypointPoiButton } from "./WaypointPoiButton";

type WaypointPointsOfInterestProps =
  LoadWaypointsDataResponse["waypointsList"]["data"][number];

/**
 * Displays points of interest at a waypoint, such as:
 * - The first ship at the waypoint (if any) and its docked/orbiting status
 * - Number of orbitals (if any)
 */
export const WaypointPointsOfInterest: FC<WaypointPointsOfInterestProps> = ({
  ships,
  orbitals,
}) => (
  <Flex direction="row" gap="2">
    {ships[0]?.distance === 0 && (
      <WaypointNearestShip key={ships[0].symbol} ship={ships[0]} />
    )}
    {orbitals.length > 0 && (
      <WaypointPoiButton
        text="Orbitals"
        badge={(orbitals?.length ?? 0).toString()}
        color="gray"
      />
    )}
  </Flex>
);
