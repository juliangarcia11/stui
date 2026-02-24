import { Flex } from "@radix-ui/themes";
import { Debug } from "~/components";
import { DashboardContainer, getAgentInfo } from "~/features/dashboard";
import { stringifyWithBigInt } from "~/utils";
import type { Route } from "./+types/dashboard";
import { getStatus } from "~/client";
import { getSession } from "~/sessions.server";
import { redirect } from "react-router";

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

  const apiStatus = await getStatus();
  const agentInfo = await getAgentInfo(token);
  return {
    token,
    agentSymbol,
    statusInfo: apiStatus.data,
    agentInfo: agentInfo,
  };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return (
    <Flex direction="column" gap="4" p="4">
      {loaderData.statusInfo && (
        <DashboardContainer {...loaderData.statusInfo} />
      )}
      <Debug>{stringifyWithBigInt(loaderData.agentInfo)}</Debug>
    </Flex>
  );
}
