import { Container, Heading } from "@radix-ui/themes";
import type { FC } from "react";
import type { GetStatusResponse } from "~/client";
import { Leaderboards } from "./Leaderboards";
import { ServerInfoHoverCard } from "./ServerInfoCard";

export const DashboardContainer: FC<GetStatusResponse> = (props) => {
  return (
    <Container size="4">
      <Heading as="h1" size="7">
        Dashboard <ServerInfoHoverCard {...props} />
      </Heading>

      <Leaderboards {...props.leaderboards} />
    </Container>
  );
};
