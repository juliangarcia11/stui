// File Purpose: Waypoint Market page container - WIP
import { Container, Flex } from "@radix-ui/themes";
import type { FC } from "react";
import { Debug } from "~/components";
import { stringifyWithBigInt } from "~/utils";
import type { MarketLoaderData } from "../loader";
import { TradeGoodsTable } from "./TradeGoodsTable";

type MarketContainerProps = MarketLoaderData & {
  waypointSymbol: string;
};

export const MarketContainer: FC<MarketContainerProps> = ({
  waypointSymbol,
  marketData,
}) => {
  const data = Object.entries(marketData)
    .map(([key, value]) => ({ key, value }))
    .reduce(
      (acc, { key, value }) => {
        acc[key] = Array.isArray(value) ? value.length : value;
        return acc;
      },
      {} as Record<string, unknown>,
    );
  return (
    <Container size="4">
      <Flex direction="column" gap="1">
        <Debug>{stringifyWithBigInt({ waypointSymbol, data })}</Debug>
        <TradeGoodsTable goods={marketData.tradeGoods} />
      </Flex>
    </Container>
  );
};
