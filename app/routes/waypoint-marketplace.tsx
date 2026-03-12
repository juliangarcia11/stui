import { redirect } from "react-router";
import type { Route } from "./+types/waypoint-marketplace";
import { extractToken } from "~/sessions.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Marketplace | STUI" },
    { name: "description", content: "SpaceTraders UI Waypoint Marketplace" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = await extractToken(request.headers.get("Cookie"));
  if (!token) return redirect("/login");

  return {
    ping: "pong",
  };
}

export default function Market({ params }: Route.ComponentProps) {
  return (
    <div>
      <h1>Market</h1>
      <p>This is the market page for: {params.waypointSymbol}</p>
    </div>
  );
}
