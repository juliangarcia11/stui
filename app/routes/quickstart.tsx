import { Container, Flex } from "@radix-ui/themes";
import { redirect } from "react-router";
import {
  loadQuickstartData,
  QuickstartPageHeader,
} from "~/features/quickstart";
import { extractToken } from "~/sessions.server";
import type { Route } from "./+types/quickstart";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Quickstart | STUI" },
    { name: "description", content: "SpaceTraders UI Quickstart" },
  ];
}

/**
 * Data loader for the `/quickstart` route.
 *
 * @see: https://reactrouter.com/start/framework/data-loading
 */
export async function loader({ request }: Route.LoaderArgs) {
  const token = await extractToken(request.headers.get("Cookie"));
  if (!token) return redirect("/login");

  return await loadQuickstartData(token);
}

export default function Quickstart({ loaderData }: Route.ComponentProps) {
  return (
    <Container>
      <Flex direction="column" gap="4">
        <QuickstartPageHeader symbol={loaderData.agentInfo.agent.symbol} />
      </Flex>
    </Container>
  );
}
