import { Container, Flex } from "@radix-ui/themes";
import type { FC } from "react";
import { WaypointsTable } from "./WaypointsTable";
import type { LoadWaypointsDataResponse } from "./loader-waypoints";

/**
 * Page container for displaying waypoints in the current system
 */
export const WaypointContainer: FC<LoadWaypointsDataResponse> = ({
  agentInfo,
  systemInfo,
  waypointsList,
}) => {
  return (
    <Container size="4" asChild>
      <Flex direction="column" gap="4">
        <WaypointsTable
          agentInfo={agentInfo}
          systemInfo={systemInfo}
          waypointsList={waypointsList}
        />
      </Flex>
    </Container>
  );
};
