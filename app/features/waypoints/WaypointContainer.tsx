import { Container, Flex, Heading } from "@radix-ui/themes";
import type { FC } from "react";
import type { Agent, System } from "~/client";
import { Debug } from "~/components";
import { stringifyWithBigInt } from "~/utils";

type WaypointContainerProps = {
  systemInfo: System;
  agentInfo: Agent;
};

export const WaypointContainer: FC<WaypointContainerProps> = (props) => {
  return (
    <Container size="4" asChild>
      <Flex direction="column" gap="4">
        <Heading as="h1" size="7">
          Waypoints
        </Heading>

        <Debug>{stringifyWithBigInt(props)}</Debug>
      </Flex>
    </Container>
  );
};
