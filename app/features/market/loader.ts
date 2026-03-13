// File Purpose: Fetch all data needed for the Waypoint Market page
import { getMarket } from "~/api";

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

  // - agent ships?
  // - agent contracts?

  return { marketData: marketData.data };
}

export type MarketLoaderData = Awaited<ReturnType<typeof loadMarketData>>;
