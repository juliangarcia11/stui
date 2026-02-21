import { Flex } from "@radix-ui/themes";
import { Debug } from "~/components";
import { DashboardCard } from "~/features/dashboard";
import { stringifyWithBigInt } from "~/utils";
import type { Route } from "./+types/dashboard";
import { getStatus } from "~/client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "STUI" },
    { name: "description", content: "Welcome to the SpaceTraders UI!" },
  ];
}

// see: https://reactrouter.com/start/framework/data-loading
export async function loader() {
  const apiStatus = await getStatus();
  return apiStatus.data;
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return <DashboardCard />;
}
