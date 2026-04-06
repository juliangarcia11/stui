import { redirect } from "react-router";
import { Debug } from "~/components";
import { loadQuickstartData } from "~/features/quickstart";
import { extractToken } from "~/sessions.server";
import { stringifyWithBigInt } from "~/utils";
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
    <div>
      <h1>Placeholder</h1>
      <Debug>{stringifyWithBigInt(loaderData.agentInfo)}</Debug>
    </div>
  );
}
