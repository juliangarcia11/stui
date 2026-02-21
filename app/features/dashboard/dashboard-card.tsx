import { Container, Heading } from "@radix-ui/themes";
import type { FC } from "react";
import type { GetStatusResponse } from "~/client";
import { ServerInfoHoverCard, ServerInfoStaticCard } from "./server-info-card";

export const DashboardCard: FC<GetStatusResponse> = (props) => {
  return (
    <Container size="4">
      <Heading as="h1" size="7">
        Dashboard <ServerInfoHoverCard {...props} />
      </Heading>
      <ServerInfoStaticCard {...props} />
    </Container>
  );
};
