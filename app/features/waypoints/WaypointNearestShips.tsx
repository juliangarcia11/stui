import { Badge, Button, Flex, Grid } from "@radix-ui/themes";
import type { FC } from "react";
import type { LoadWaypointsDataResponse } from "./loader-waypoints";

type WaypointNearestShipsProps = Pick<
  LoadWaypointsDataResponse["systemInfo"]["waypoints"][number],
  "ships"
>;

/**
 * Displays the nearest 4 ships to a waypoint, if any are present in the system.
 * If a ship is at the waypoint, it will be highlighted in green and show "Here" instead of a distance.
 */
export const WaypointNearestShips: FC<WaypointNearestShipsProps> = ({
  ships,
}) => {
  if (ships.length === 0) return null;
  if (ships.length === 1 && ships[0])
    return (
      <ShipButton
        shipSymbol={ships[0].shipSymbol}
        distance={ships[0].distance}
      />
    );

  return (
    <Grid columns="2" gap="2">
      {ships.slice(4).map((ship) => (
        <ShipButton {...ship} key={ship.shipSymbol} />
      ))}
    </Grid>
  );
};

// TODO: Add ship-waypoint related styles & actions based on:
// - if the ship is at the waypoint: detailed services available at the waypoint
// - if the ship is not at the waypoint but is in the same system: distance info + navigate to the waypoint
// - if the ship is in transit to the waypoint: show ETA
// - if the ship is in transit to another waypoint: show 'in transit' notice

/**
 * Button component for displaying a ship's symbol and its distance to something.
 * If the distance is 0, it indicates the ship is "Here" and the button is highlighted in green.
 */
const ShipButton: FC<WaypointNearestShipsProps["ships"][number]> = ({
  shipSymbol,
  distance,
}) => {
  const isHere = distance.toString() === "0";
  const color = isHere ? "green" : undefined;

  return (
    <Button color={color} variant="outline" size="2">
      <Flex align="center" gap="2">
        {shipSymbol}{" "}
        <Badge color={color}>{isHere ? "Here" : `${distance}u`}</Badge>
      </Flex>
    </Button>
  );
};
