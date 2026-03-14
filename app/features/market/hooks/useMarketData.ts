import { useLoaderData } from "react-router";
import type { MarketLoaderData } from "../types";

export function useMarketData() {
  return useLoaderData<MarketLoaderData>();
}
