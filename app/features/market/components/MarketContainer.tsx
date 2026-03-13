// File Purpose: Waypoint Market page container - WIP
import type { FC } from "react";
import type { MarketLoaderData } from "../loader";
import { Debug } from "~/components";
import { stringifyWithBigInt } from "~/utils";

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
    <div>
      <h1>Market Data for {waypointSymbol}</h1>
      <Debug>{stringifyWithBigInt(data)}</Debug>
    </div>
  );
};
