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

  // - join marketData.data.tradeGoods with marketData.data.exports, imports, exchange
  // - get transactions for each trade good and add to the good object
  // Be UI ready.
  const tradeGoods: UITradeGood[] =
    marketData.data.tradeGoods?.map((good) => ({
      ...good,
      name: getMarketParam(good, marketData.data, "name") || good.symbol,
      description: getMarketParam(good, marketData.data, "description") || "",
      transactions: getTransactions(good.symbol, marketData.data) || [],
    })) || [];

  return { marketData: { ...marketData.data, tradeGoods } };
}

/**
 * Helper function to get a parameter off of the market data
 * @param good the trade good to get the parameter for
 * @param market the full market data object
 * @param key the key of the parameter to get
 * @returns the value of the parameter, or undefined if not found
 */
const getMarketParam = (
  good: MarketTradeGood,
  market: Market,
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

const getTransactions = (
  goodSymbol: MarketTradeGood["symbol"],
  market: Market,
) => {
  return market.transactions?.filter(
    (transaction) => transaction.tradeSymbol === goodSymbol,
  );
};

export type MarketLoaderData = Awaited<ReturnType<typeof loadMarketData>>;
