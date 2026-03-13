import { Flex } from "@radix-ui/themes";
import type { FC } from "react";
import type { UIWaypoint } from "../types";
import { WaypointNearestShip } from "./WaypointNearestShip";
import { WaypointPoiButton } from "./WaypointPoiButton";

type WaypointPointsOfInterestProps = UIWaypoint & {
  isHeadquarters?: boolean;
};

/**
 * Displays points of interest at a waypoint, such as:
 * - The first ship at the waypoint (if any) and its docked/orbiting status
 * - Number of orbitals (if any)
 */
export const WaypointPointsOfInterest: FC<WaypointPointsOfInterestProps> = ({
  isHeadquarters,
  ships,
  orbitals,
  traits,
}) => {
  const ship = ships[0];
  const hasShip = ship?.distance === 0;
  const hasOrbitals = (orbitals?.length ?? 0) > 0;
  const orbitalsCount = (orbitals?.length ?? 0).toString();
  const market = traits.find((trait) => trait.symbol === "MARKETPLACE");
  const shipyard = traits.find((trait) => trait.symbol === "SHIPYARD");
  const outpost = traits.find((trait) => trait.symbol === "OUTPOST");

  return (
    <Flex direction="row" gap="2">
      {isHeadquarters && <WaypointPoiButton text="Headquarters" color="sky" />}

      {/* TODO: could make this trigger a confirm dialog to send the ship to orbit/dock it */}
      {hasShip && <WaypointNearestShip key={ship.symbol} ship={ship} />}

      {/* TODO: could make the rest of these open dialog with their information */}
      {hasOrbitals && (
        <WaypointPoiButton text="Orbitals" badge={orbitalsCount} color="gray" />
      )}
      {market && <WaypointPoiButton text="Market" color="violet" />}
      {shipyard && <WaypointPoiButton text="Shipyard" color="indigo" />}
      {outpost && <WaypointPoiButton text="Outpost" color="orange" />}
    </Flex>
  );
};
