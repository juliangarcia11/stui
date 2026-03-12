import { redirect } from "react-router";
import { ErrorBoundary } from "~/components";
import {
  loadWaypointsData,
  WaypointContainer,
  executeWaypointAction,
} from "~/features/waypoints";
import { extractToken } from "~/sessions.server";
import type { Route } from "./+types/waypoints";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Waypoints | STUI" },
    { name: "description", content: "SpaceTraders UI Waypoints Data Table" },
  ];
}

/**
 * Data loader for the `/waypoints` route.
 * Optional query parameter: `system` - the symbol of the system to fetch waypoints for.
 * If `system` is not provided, it defaults to the system of the agent's headquarters.
 *
 * @see: https://reactrouter.com/start/framework/data-loading
 */
export async function loader({ request }: Route.LoaderArgs) {
  const token = await extractToken(request.headers.get("Cookie"));
  if (!token) return redirect("/login");

  const searchparams = new URL(request.url).searchParams;
  return await loadWaypointsData(token, searchparams);
}

/**
 * Action handler for the `/waypoints` route.
 * This is a generic handler that extracts the token & form data for the request, then provides
 * them to the `executeWaypointAction` function, which will route to the appropriate API call
 * based on the "action" key in the form data.
 */
export async function action({ request }: Route.ActionArgs) {
  const token = await extractToken(request.headers.get("Cookie"));
  if (!token) return redirect("/login");

  const formData = await request.formData();
  return executeWaypointAction(token, formData);
}

export default function Waypoints({ loaderData }: Route.ComponentProps) {
  return <WaypointContainer {...loaderData} />;
}

/**
 * Reusable error boundary for errors in the loader, component, or actions.
 */
export { ErrorBoundary };
