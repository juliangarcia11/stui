// File Purpose: React Router route orchestrator
import { redirect } from "react-router";
import { loadMarketData, MarketContainer } from "~/features/market";
import { extractToken } from "~/sessions.server";
import type { Route } from "./+types/waypoint-market";

// Route Meta given to the Browser
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Market | STUI" },
    { name: "description", content: "SpaceTraders UI Waypoint Market" },
  ];
}

// Route data loader for the route, runs on the server before rendering the component
export async function loader({ request, params }: Route.LoaderArgs) {
  const token = await extractToken(request.headers.get("Cookie"));
  if (!token) return redirect("/login");

  const waypointSymbol = params.waypointSymbol;
  if (!waypointSymbol) return redirect("/waypoints");

  return await loadMarketData(token, params);
}

// Route component, rendered after the loader has run and provided data
export default function Market({ loaderData, params }: Route.ComponentProps) {
  const waypointSymbol = params.waypointSymbol;

  return <MarketContainer waypointSymbol={waypointSymbol} {...loaderData} />;
}
