import { Container, Flex, Heading } from "@radix-ui/themes";
import type { FC } from "react";
import type { AgentInfo } from "~/api/agent/get-agent-info";
import type { GetStatusResponse } from "~/api/client";
import { AgentOverviewCard } from "../agent/AgentOverviewCard";
import { ContractOverviewCard } from "../contracts";
import { ShipOverviewCard } from "../ships";
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

        <Flex gap="2" wrap="wrap">
          <AgentOverviewCard agent={agentInfo.agent} />

          {agentInfo.contracts[0] && !agentInfo.contracts[0].accepted && (
            <ContractOverviewCard contract={agentInfo.contracts[0]} />
          )}

          {agentInfo.ships.length > 0 &&
            agentInfo.ships.map((s) => (
              <ShipOverviewCard key={s.symbol} ship={s} />
            ))}

          <Leaderboards {...statusInfo.leaderboards} />
        </Flex>
      </Container>
    </Flex>
  );
};
