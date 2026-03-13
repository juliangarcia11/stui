import { useLoaderData } from "react-router";
import type { MarketLoaderData } from "../loader";

export function useMarketData() {
  return useLoaderData<MarketLoaderData>();
}
