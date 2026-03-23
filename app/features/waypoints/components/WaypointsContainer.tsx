import { Container, Flex, Text } from "@radix-ui/themes";
import type { FC } from "react";
import { Paginator } from "~/components";
import type { LoadWaypointsDataResponse } from "../loader";
import { calculateTotalPages } from "../utils";
import { DockingAlert } from "./DockingAlert";
import { OrbitingAlert } from "./OrbitingAlert";
import { WaypointsTable } from "./WaypointsTable";
import { WaypointsTraitsFilter } from "./WaypointsTraitsFilter";
import { WaypointsTypeFilter } from "./WaypointsTypeFilter";

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
        <WaypointsFilters />
        <WaypointsTable
          agentInfo={agentInfo}
          systemInfo={systemInfo}
          waypointsList={waypointsList}
        />
        <Flex justify="center">
          <Paginator to="/waypoints" totalPages={totalPages} />
        </Flex>
      </Flex>

      <OrbitingAlert />
      <DockingAlert />
    </Container>
  );
};

const WaypointsFilters: React.FC = () => {
  return (
    <Flex direction="column" gap="0">
      <Text as="label" size="1" style={{ color: "var(--accent-11)" }}>
        Filters:
      </Text>
      <Flex justify="start" align="center" gap="2" ml="2">
        <WaypointsTypeFilter />
        <WaypointsTraitsFilter />
      </Flex>
    </Flex>
  );
};
