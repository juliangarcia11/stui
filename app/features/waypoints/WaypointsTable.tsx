import { Badge, Table, type BadgeProps } from "@radix-ui/themes";
import type { FC } from "react";
import type { SystemWaypoint, WaypointType } from "~/client";
import { capitalizeWords } from "~/utils";

type WaypointsTableProps = {
  waypoints: SystemWaypoint[];
};

export const WaypointsTable: FC<WaypointsTableProps> = ({ waypoints }) => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Symbol</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Coordinates</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {waypoints.map((waypoint) => (
          <Table.Row key={waypoint.symbol}>
            <Table.RowHeaderCell>{waypoint.symbol}</Table.RowHeaderCell>
            <Table.Cell>
              <WaypointTypeBadge type={waypoint.type} />
            </Table.Cell>
            <Table.Cell>
              {waypoint.x}, {waypoint.y}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const WaypointBadgeColor: Record<WaypointType, BadgeProps["color"]> = {
  PLANET: "blue",
  GAS_GIANT: "cyan",
  MOON: "gray",
  ORBITAL_STATION: "amber",
  JUMP_GATE: "purple",
  ASTEROID_FIELD: "orange",
  ASTEROID: "yellow",
  ENGINEERED_ASTEROID: "yellow",
  ASTEROID_BASE: "yellow",
  NEBULA: "crimson",
  DEBRIS_FIELD: "indigo",
  GRAVITY_WELL: "teal",
  ARTIFICIAL_GRAVITY_WELL: "teal",
  FUEL_STATION: "green",
};

const WaypointTypeBadge: FC<{ type: WaypointType }> = ({ type }) => (
  <Badge color={WaypointBadgeColor[type]}>
    {capitalizeWords(type.replace("_", " "))}
  </Badge>
);

// const
