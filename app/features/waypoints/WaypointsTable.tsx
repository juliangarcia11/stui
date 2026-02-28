import { Table } from "@radix-ui/themes";
import type { FC } from "react";
import type { LoadWaypointsDataResponse } from "./loader-waypoints";
import { WaypointNearestShip } from "./WaypointNearestShip";
import { WaypointSymbol } from "./WaypointSymbol";
import { WaypointTypeBadge } from "./WaypointTypeBadge";
import { Debug } from "~/components";
import { stringifyWithBigInt } from "~/utils";

/**
 * Table display of waypoints in the current system, showing:
 * - Symbol
 * - Type
 * - Coordinates
 */
export const WaypointsTable: FC<LoadWaypointsDataResponse> = ({
  agentInfo: { agent, ships, contracts },
  systemInfo,
  waypointsList,
}) => {
  // return <Debug>{stringifyWithBigInt(waypointsList)}</Debug>;

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Symbol</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Coordinates</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Nearest Ship</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {waypointsList.data.map((waypoint) => (
          <Table.Row key={waypoint.symbol}>
            <Table.RowHeaderCell>
              <WaypointSymbol
                headquarters={agent.headquarters}
                waypointSymbol={waypoint.symbol}
              />
            </Table.RowHeaderCell>
            <Table.Cell>
              <WaypointTypeBadge type={waypoint.type} />
            </Table.Cell>
            <Table.Cell>
              {waypoint.x}, {waypoint.y}
            </Table.Cell>
            <Table.Cell>
              <WaypointNearestShip ship={waypoint.ships[0]} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
