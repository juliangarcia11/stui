import type {
  MarketTradeGood,
  MarketTransaction,
  TradeGood,
} from "~/api/client";
import type { loadMarketData } from "./loader";

export type UITradeGood = TradeGood &
  Partial<MarketTradeGood> & {
    type: MarketTradeGood["type"];
    transactions: MarketTransaction[];
  };

export type MarketLoaderData = Awaited<ReturnType<typeof loadMarketData>>;
