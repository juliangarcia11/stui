import { Flex } from "@radix-ui/themes";
import { Debug } from "~/components";
import {
  DashboardContainer,
  getAgentInfo,
  getApiStatus,
} from "~/features/dashboard";
import { stringifyWithBigInt } from "~/utils";
import type { Route } from "./+types/dashboard";
import { getStatus } from "~/client";
import { getSession } from "~/sessions.server";
import { redirect } from "react-router";
import { ErrorBoundary } from "~/components";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "STUI" },
    { name: "description", content: "Welcome to the SpaceTraders UI!" },
  ];
}

// see: https://reactrouter.com/start/framework/data-loading
export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const agentSymbol = session.get("agentSymbol");

  if (!token?.length || !agentSymbol?.length) {
    return redirect("/login");
  }

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
  return <DashboardContainer {...loaderData.statusInfo} />;
}

/**
 * Reusable error boundary for errors in the loader, component, or actions.
 */
export { ErrorBoundary };
