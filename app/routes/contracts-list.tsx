import { redirect } from "react-router";
import { ErrorBoundary } from "~/components";
import { ContractsContainer, loadContractData } from "~/features/contracts";
import { extractToken } from "~/sessions.server";
import type { Route } from "./+types/contracts-list";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contracts | STUI" },
    { name: "description", content: "SpaceTraders UI Agent Contracts" },
  ];
}

/**
 * Data loader for the `/contracts` route. Fetches the agent's contracts from the API.
 * Requires the user's token to be present in the session cookie; if not, redirects to the login page.
 *
 * @see: https://reactrouter.com/start/framework/data-loading
 */
export async function loader({ request }: Route.LoaderArgs) {
  const token = await extractToken(request.headers.get("Cookie"));
  if (!token) return redirect("/login");

  return await loadContractData(token);
}

export default function Contracts({ loaderData }: Route.ComponentProps) {
  return <ContractsContainer {...loaderData} />;
}

/**
 * Reusable error boundary for errors in the loader, component, or actions.
 */
export { ErrorBoundary };
