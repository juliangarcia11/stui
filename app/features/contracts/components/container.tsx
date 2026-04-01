import { DotFilledIcon, DotIcon } from "@radix-ui/react-icons";
import {
  Box,
  Card,
  Container,
  DataList,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { useMemo, type FC } from "react";
import type { AgentInfo } from "~/api";
import type {
  Contract,
  ContractDeliverGood,
  FactionSymbol,
} from "~/api/client";
import { Debug } from "~/components";
import { WaypointFactionBadge } from "~/features/waypoints/components/WaypointFactionBadge";
import {
  capitalizeWords,
  formatRelativeDate,
  stringifyWithBigInt,
} from "~/utils";

export const ContractsContainer: FC<AgentInfo> = (props) => {
  return (
    <Container size="4">
      <Flex direction="column" gap="1">
        {props.contracts.length > 0 ? (
          props.contracts.map((contract) => (
            <ContractCard key={contract.id} {...contract} />
          ))
        ) : (
          <NoContracts />
        )}
      </Flex>
    </Container>
  );
};

const NoContracts: FC = () => {
  return (
    <Card>
      <Heading>No contracts available</Heading>
      <Text as="p" size="2">
        You currently have no active contracts. Check back later for new
        opportunities!
      </Text>
    </Card>
  );
};

const TYPE_MAP: Record<Contract["type"], string> = {
  PROCUREMENT: "Procure",
  TRANSPORT: "Transport",
  SHUTTLE: "Shuttle",
};

const ContractCard: FC<Contract> = (props) => {
  return (
    <Card>
      <Flex justify="between" align="center" gap="2">
        <Heading as="h3">{TYPE_MAP[props.type]}</Heading>

        <Flex justify="end" align="baseline" gap="2">
          <ContractDeliverablesShort goods={props.terms.deliver} />
          <WaypointFactionBadge
            factionSymbol={props.factionSymbol as FactionSymbol}
            size="3"
          />
        </Flex>
      </Flex>

      <ContractDetails contract={props} />
    </Card>
  );
};

const ContractDeliverablesShort: FC<{
  goods: Contract["terms"]["deliver"];
}> = ({ goods }) => {
  const firstGood = goods?.[0]
    ? capitalizeWords(goods[0].tradeSymbol.replace(/_/g, " "))
    : "";
  const unitsRequired = goods?.[0]?.unitsRequired || 0;
  const hasMultipleGoods = goods && goods.length > 1;

  return (
    <Flex direction="row" align="baseline" gap="2">
      <Text size="3">{firstGood}</Text>
      <Text size="1">
        (
        {hasMultipleGoods
          ? `+${goods.length - 1} more`
          : `${unitsRequired} units`}
        )
      </Text>
    </Flex>
  );
};

const ContractDetails: FC<{
  contract: Contract;
}> = ({ contract }) => {
  return (
    <Box width="fit-content" asChild>
      <Card>
        <DataList.Root size="1">
          <DataList.Item align="center">
            <DataList.Label>Deliver to:</DataList.Label>
            <DataList.Value>
              {contract.terms.deliver?.at(0)?.destinationSymbol || "Unknown"}
            </DataList.Value>
          </DataList.Item>
          {!contract.accepted && (
            <DataList.Item align="center">
              <DataList.Label>Acceptance Deadline:</DataList.Label>
              <DataList.Value>
                {formatRelativeDate(contract.deadlineToAccept!)}
              </DataList.Value>
            </DataList.Item>
          )}
          {!contract.accepted && (
            <DataList.Item align="center">
              <DataList.Label>Acceptance Payment:</DataList.Label>
              <DataList.Value>
                {contract.terms.payment.onAccepted} cr
              </DataList.Value>
            </DataList.Item>
          )}
          <DataList.Item align="center">
            <DataList.Label>Delivery Deadline:</DataList.Label>
            <DataList.Value>
              {formatRelativeDate(contract.terms.deadline)}
            </DataList.Value>
          </DataList.Item>
          <DataList.Item align="center">
            <DataList.Label>Delivery Payment:</DataList.Label>
            <DataList.Value>
              {contract.terms.payment.onFulfilled} cr
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Card>
    </Box>
  );
};
