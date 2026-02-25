import { Container, Flex, Heading } from "@radix-ui/themes";
import { redirect } from "react-router";
import { Debug, ErrorBoundary } from "~/components";
import {
  getAgent,
  getSystemInfo,
  transformWaypointToSystem,
} from "~/features/waypoints";
import { extractToken } from "~/sessions.server";
import { stringifyWithBigInt } from "~/utils";
import type { Route } from "./+types/waypoints";
import { WaypointContainer } from "~/features/waypoints/WaypointContainer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Waypoints | STUI" },
    { name: "description", content: "SpaceTraders UI Waypoints Data Table" },
  ];
}

/**
 * Data loader for the `/waypoints` route.
 * Optional query parameter: `system` - the symbol of the system to fetch waypoints for.
 * If `system` is not provided, it defaults to the system of the agent's headquarters.
 *
 * @see: https://reactrouter.com/start/framework/data-loading
 */
export async function loader({ request }: Route.LoaderArgs) {
  const token = await extractToken(request.headers.get("Cookie"));
  if (!token) return redirect("/login");

  const searchparams = new URL(request.url).searchParams;
  const system = searchparams.get("system");

  const agentInfo = await getAgent(token);
  if (agentInfo.status === "error") {
    throw new Error(`Failed to fetch agent info: ${agentInfo.message}`);
  }

  const systemSymbol = system?.length
    ? system
    : transformWaypointToSystem(agentInfo.data.headquarters);
  const systemInfo = await getSystemInfo({ token, systemSymbol });

  if (systemInfo.status === "error") {
    throw new Error(`Failed to fetch system info: ${systemInfo.message}`);
  }

  return { agentInfo: agentInfo.data, systemInfo: systemInfo.data };
}

export default function Waypoints({ loaderData }: Route.ComponentProps) {
  return <WaypointContainer {...loaderData} />;
}

/**
 * Reusable error boundary for errors in the loader, component, or actions.
 */
export { ErrorBoundary };
