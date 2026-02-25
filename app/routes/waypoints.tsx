import { Container, Flex, Heading } from "@radix-ui/themes";
import { redirect } from "react-router";
import { Debug } from "~/components";
import { extractToken } from "~/sessions.server";
import { stringifyWithBigInt } from "~/utils";
import type { Route } from "./+types/waypoints";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Waypoints | STUI" },
    { name: "description", content: "SpaceTraders UI Waypoints Data Table" },
  ];
}

// see: https://reactrouter.com/start/framework/data-loading
export async function loader({ request }: Route.LoaderArgs) {
  const token = await extractToken(request.headers.get("Cookie"));
  if (!token) return redirect("/login");

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
