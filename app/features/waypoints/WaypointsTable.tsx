import { Badge, Flex, Heading, Table, Text } from "@radix-ui/themes";
import type { FC } from "react";
import type { LoadWaypointsDataResponse } from "./loader-waypoints";
import { WaypointPointsOfInterest } from "./WaypointPois";
import { WaypointSymbol } from "./WaypointSymbol";
import { WaypointTypeBadge } from "./WaypointTypeBadge";

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
  return (
    <Table.Root variant="surface" size="1">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>
            <WaypointTitle
              name={systemInfo.name ?? "Unnamed System"}
              symbol={systemInfo.symbol}
            />
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Coordinates</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>{"What's Here?"}</Table.ColumnHeaderCell>
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
              <WaypointPointsOfInterest {...waypoint} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

/**
 * Title displaying the system name and symbol
 */
const WaypointTitle: FC<{ name: string; symbol: string }> = ({
  name,
  symbol,
}) => (
  <Flex direction="row" gap="2" align="baseline" asChild>
    <Heading as="h1" size="3">
      Waypoints at:
      <Text as="span" size="2" style={{ color: "var(--accent-11)" }}>
        {name}
      </Text>
      <Badge variant="outline" my="auto">
        {symbol}
      </Badge>
    </Heading>
  </Flex>
);
