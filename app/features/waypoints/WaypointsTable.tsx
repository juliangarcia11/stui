import { Table } from "@radix-ui/themes";
import type { FC } from "react";
import type { Agent, System } from "~/client";
import { WaypointSymbol } from "./WaypointSymbol";
import { WaypointTypeBadge } from "./WaypointTypeBadge";

type WaypointsTableProps = {
  agentInfo: Agent;
  systemInfo: System;
};

/**
 * Table display of waypoints in the current system, showing:
 * - Symbol
 * - Type
 * - Coordinates
 */
export const WaypointsTable: FC<WaypointsTableProps> = ({
  agentInfo,
  systemInfo,
}) => {
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
        {systemInfo.waypoints.map((waypoint) => (
          <Table.Row key={waypoint.symbol}>
            <Table.RowHeaderCell>
              <WaypointSymbol
                headquarters={agentInfo.headquarters}
                waypointSymbol={waypoint.symbol}
              />
            </Table.RowHeaderCell>
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
