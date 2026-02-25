import { redirect } from "react-router";
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/waypoints";
import { Debug } from "~/components";
import { Container, Flex, Heading } from "@radix-ui/themes";
import { stringifyWithBigInt } from "~/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Waypoints | STUI" },
    { name: "description", content: "SpaceTraders UI Waypoints Data Table" },
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

  return {};
}

export default function Waypoints({ loaderData }: Route.ComponentProps) {
  return (
    <Container size="4" asChild>
      <Flex direction="column" gap="4">
        <Heading as="h1" size="7">
          Waypoints
        </Heading>

        <Debug>{stringifyWithBigInt(loaderData)}</Debug>
      </Flex>
    </Container>
  );
}
