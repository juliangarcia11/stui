import { redirect } from "react-router";
import { ErrorBoundary } from "~/components";
import {
  DashboardContainer,
  getAgentInfo,
  getApiStatus,
} from "~/features/dashboard";
import { extractToken, getSession } from "~/sessions.server";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "STUI" },
    { name: "description", content: "Welcome to the SpaceTraders UI!" },
  ];
}

// see: https://reactrouter.com/start/framework/data-loading
export async function loader({ request }: Route.LoaderArgs) {
  const token = await extractToken(request.headers.get("Cookie"));
  if (!token) return redirect("/login");

  const apiStatus = await getApiStatus();
  const agentInfo = await getAgentInfo(token);

  if (apiStatus.status === "error") {
    throw new Error(`Failed to fetch API status: ${apiStatus.message}`);
  }
  if (agentInfo.status === "error") {
    throw new Error(`Failed to fetch agent info: ${agentInfo.message}`);
  }

  return {
    statusInfo: apiStatus.data,
    agentInfo: agentInfo.data,
  };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return <DashboardContainer {...loaderData} />;
}

/**
 * Reusable error boundary for errors in the loader, component, or actions.
 */
export { ErrorBoundary };
