// File Purpose: Waypoint Market page container - WIP
import { Box, Container, Flex, Tabs } from "@radix-ui/themes";
import type { FC, ReactNode } from "react";
import { Debug } from "~/components";
import { capitalizeWords, stringifyWithBigInt } from "~/utils";
import type { MarketLoaderData } from "../loader";
import { TradeGoodsTable } from "./TradeGoodsTable";

type TabKeys = "tradeGoods" | "transactions";
type TabList = Record<TabKeys, ReactNode>;

type MarketContainerProps = MarketLoaderData & {
  waypointSymbol: string;
};

export const MarketContainer: FC<MarketContainerProps> = ({
  waypointSymbol,
  marketData,
}) => {
  const tabs: TabList = {
    tradeGoods: <TradeGoodsTable goods={marketData.tradeGoods} />,
    transactions: <Debug>{stringifyWithBigInt(marketData.transactions)}</Debug>,
  };
  return (
    <Container size="4">
      <Flex direction="column" gap="1">
        <Tabs.Root defaultValue="tradeGoods">
          <Tabs.List>
            {Object.keys(tabs).map((key) => (
              <Tabs.Trigger key={key} value={key}>
                {capitalizeWords(key)}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <Box pt="3">
            {Object.entries(tabs).map(([key, content]) => (
              <Tabs.Content key={key} value={key}>
                {content}
              </Tabs.Content>
            ))}
          </Box>
        </Tabs.Root>
      </Flex>
    </Container>
  );
};
