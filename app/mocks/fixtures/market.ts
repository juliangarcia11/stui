import type { Market } from "~/api/client";
import { MARKET_WAYPOINT } from "./waypoints";

export const marketFixture: Market = {
  symbol: MARKET_WAYPOINT,
  exports: [{ symbol: "IRON_ORE", name: "Iron Ore", description: "Unprocessed iron ore." }],
  imports: [{ symbol: "COPPER", name: "Copper", description: "Refined copper." }],
  exchange: [{ symbol: "ALUMINUM", name: "Aluminum", description: "Refined aluminum." }],
  tradeGoods: [
    { symbol: "IRON_ORE", type: "EXPORT", tradeVolume: 100, supply: "ABUNDANT", activity: "STRONG", purchasePrice: 50, sellPrice: 40 },
    { symbol: "COPPER", type: "IMPORT", tradeVolume: 60, supply: "MODERATE", activity: "GROWING", purchasePrice: 200, sellPrice: 180 },
    { symbol: "ALUMINUM", type: "EXCHANGE", tradeVolume: 40, supply: "LIMITED", purchasePrice: 300, sellPrice: 280 },
  ],
};
