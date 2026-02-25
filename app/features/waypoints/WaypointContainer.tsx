import { Badge, Container, Flex, Heading, Text } from "@radix-ui/themes";
import type { FC } from "react";
import { WaypointsTable } from "./WaypointsTable";
import type { LoadWaypointsDataResponse } from "./loader-waypoints";

/**
 * Page container for displaying waypoints in the current system
 */
export const WaypointContainer: FC<LoadWaypointsDataResponse> = ({
  agentInfo,
  systemInfo,
}) => {
  return (
    <Container size="4" asChild>
      <Flex direction="column" gap="4">
        <WaypointContainerHeader
          name={systemInfo.name ?? "Unnamed System"}
          symbol={systemInfo.symbol}
        />

        <WaypointsTable agentInfo={agentInfo} systemInfo={systemInfo} />
      </Flex>
    </Container>
  );
};

/**
 * Page header for the WaypointContainer, displaying the system name and symbol
 */
const WaypointContainerHeader: FC<{ name: string; symbol: string }> = ({
  name,
  symbol,
}) => (
  <Flex direction="row" gap="2" align="baseline" asChild>
    <Heading as="h1" size="7">
      Waypoints at:
      <Text as="span" size="6" style={{ color: "var(--accent-11)" }}>
        {name}
      </Text>
      <Badge variant="outline" my="auto">
        {symbol}
      </Badge>
    </Heading>
  </Flex>
);
