// File Purpose: Fetch all data needed for the Waypoint Market page
import { getMarket } from "~/api";
import type { Market, MarketTradeGood, TradeGood } from "~/api/client";
import type { UITradeGood } from "./types";

export async function loadMarketData(
  token: string,
  params: { waypointSymbol: string },
) {
  const waypointSymbol = params.waypointSymbol;
  const marketData = await getMarket({
    token,
    waypointSymbol,
  });

  if (marketData.status === "error") {
    throw new Error(`Failed to fetch market data: ${marketData.message}`);
  }
  if (!marketData.data) {
    throw new Error("No market data returned");
  }

  // join marketData.data.tradeGoods with marketData.data.exports, imports, exchange
  // to get name & description for each trade good. Be UI ready.
  const tradeGoods: UITradeGood[] =
    marketData.data.tradeGoods?.map((good) => ({
      ...good,
      name:
        getMarketDataParam(marketData.data as Market, good, "name") ||
        good.symbol,
      description:
        getMarketDataParam(marketData.data as Market, good, "description") ||
        "",
    })) || [];

  return { marketData: { ...marketData.data, tradeGoods } };
}

/**
 * Helper function to get a parameter off of the market data
 * @param market the full market data object
 * @param good the trade good to get the parameter for
 * @param key the key of the parameter to get
 * @returns the value of the parameter, or undefined if not found
 */
const getMarketDataParam = (
  market: Market,
  good: MarketTradeGood,
  key: keyof TradeGood,
) => {
  switch (good.type) {
    case "IMPORT":
      return market.imports?.find((item) => item.symbol === good.symbol)?.[key];
    case "EXPORT":
      return market.exports?.find((item) => item.symbol === good.symbol)?.[key];
    case "EXCHANGE":
      return market.exchange?.find((item) => item.symbol === good.symbol)?.[
        key
      ];
    default:
      return undefined;
  }
};

export type MarketLoaderData = Awaited<ReturnType<typeof loadMarketData>>;
