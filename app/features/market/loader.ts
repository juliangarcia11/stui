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

  // Build the best market data we can for the UI
  const hasFullData = !!marketData.data.tradeGoods?.length;
  const buildFn = hasFullData ? buildFullMarketData : buildPartialMarketData;
  const tradeGoods = buildFn(marketData.data);

  return { marketData: { ...marketData.data, tradeGoods } };
}

/**
 * Helper function to build out a partial market data object.
 * In the case where the agent does not have a ship in the market's waypoint, we won't get any data in the tradeGoods array,
 * and the transactions will be empty. However, we can still show a partial version of the market data using the exports,
 * imports, and exchange arrays, which will show what goods are available for trade and their descriptions.
 *
 * @param market the full market data object
 * @returns an array of UITradeGood objects with the data we have available
 */
const buildPartialMarketData = (market: Market): UITradeGood[] => {
  const mapper = (
    good: TradeGood,
    type: MarketTradeGood["type"],
  ): UITradeGood => ({
    ...good,
    type,
    // We won't have transaction data in this case, so just set to empty array
    transactions: [],
  });

  const imports = market.imports?.map((good) => mapper(good, "IMPORT")) || [];
  const exports = market.exports?.map((good) => mapper(good, "EXPORT")) || [];
  const exchange =
    market.exchange?.map((good) => mapper(good, "EXCHANGE")) || [];

  // A trade good will not be in multiple arrays, so simple concatenation is fine.
  return [...imports, ...exports, ...exchange];
};

/**
 * Helper function to build out the full market data for the UI:
 * - join marketData.data.tradeGoods with marketData.data.exports, imports, exchange
 * - get transactions for each trade good and add to the good object
 */
const buildFullMarketData = (market: Market): UITradeGood[] => {
  return (
    market.tradeGoods?.map((good) => ({
      ...good,
      name: getMarketParam(good, market, "name") || good.symbol,
      description: getMarketParam(good, market, "description") || "",
      transactions: getTransactions(good.symbol, market) || [],
    })) || []
  );
};

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

/**
 * Helper function to get the transactions for a given trade good symbol from the market data
 * @param goodSymbol the symbol of the trade good to get transactions for
 * @param market the full market data object
 * @returns an array of transactions for the given trade good symbol, or undefined if not found
 */
const getTransactions = (
  goodSymbol: MarketTradeGood["symbol"],
  market: Market,
) => {
  return market.transactions?.filter(
    (transaction) => transaction.tradeSymbol === goodSymbol,
  );
};
