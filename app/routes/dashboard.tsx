import { Flex } from "@radix-ui/themes";
import { Debug } from "~/components";
import { DashboardCard } from "~/features/dashboard";
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
  const agentId = session.get("agentId");

  if (!agentId?.length) {
    return redirect("/login");
  }

  const apiStatus = await getStatus();
  return {
    agentId,
    statusResponse: apiStatus.data,
  };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return (
    <Flex direction="column" gap="4" p="4">
      {loaderData.statusResponse && (
        <DashboardCard {...loaderData.statusResponse} />
      )}
      <Debug>{stringifyWithBigInt(loaderData.agentId)}</Debug>
    </Flex>
  );
}
