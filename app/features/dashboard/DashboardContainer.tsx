import { Container, Flex, Heading } from "@radix-ui/themes";
import type { FC } from "react";
import type { AgentInfo } from "~/api";
import type { GetStatusResponse } from "~/api/client";
import { Leaderboards } from "./Leaderboards";
import { ServerInfoHoverCard } from "./ServerInfoCard";

type DashboardContainerProps = {
  statusInfo: GetStatusResponse;
  agentInfo: AgentInfo;
};

export const DashboardContainer: FC<DashboardContainerProps> = ({
  statusInfo,
  agentInfo,
}) => {
  return (
    <Flex direction="column" gap="4" p="4">
      <Container size="4">
        <Heading as="h1" size="7">
          Dashboard <ServerInfoHoverCard {...statusInfo} />
        </Heading>

        <Leaderboards {...statusInfo.leaderboards} />
      </Container>
    </Flex>
  );
};
