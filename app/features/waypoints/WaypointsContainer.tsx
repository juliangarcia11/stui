import { Container, Flex } from "@radix-ui/themes";
import type { FC } from "react";
import { WaypointsTable } from "./WaypointsTable";
import type { LoadWaypointsDataResponse } from "./loader-waypoints";
import { Paginator } from "~/components";
import { calculateTotalPages } from "./utils";

/**
 * Page container for displaying waypoints in the current system in a paginated table format.
 * Paging buttons trigger URL search parameter updates, which in turn trigger data refetches via our loader.
 */
export const WaypointsContainer: FC<LoadWaypointsDataResponse> = ({
  agentInfo,
  systemInfo,
  waypointsList,
}) => {
  const totalPages = calculateTotalPages(
    waypointsList.meta.total,
    waypointsList.meta.limit,
  );
  return (
    <Container size="4">
      <Flex direction="column" gap="1">
        <WaypointsTable
          agentInfo={agentInfo}
          systemInfo={systemInfo}
          waypointsList={waypointsList}
        />
        <Flex justify="center">
          <Paginator to="/waypoints" totalPages={totalPages} />
        </Flex>
      </Flex>
    </Container>
  );
};
