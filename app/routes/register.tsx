import { data, redirect } from "react-router";
import { FactionSymbol } from "~/client";
import { registerAgent, RegistrationForm } from "~/features/auth";
import { commitSession, flashError, getSession } from "../sessions.server";
import type { Route } from "./+types/login";

/**
 * Pre-check user session as page loads.
 * If user is signed in, reroute to `/`
 * If user session has an error (form was already submitted), get that to the UI
 */
export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("token")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/");
  }

  return data(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
}

/**
 * Registration form submission action
 * 1. Extract form data from the request
 * 2. Attempt registration
 * 3. Flash error to session storage, or
 * 4. Set user session & redirect to `/`
 */
export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const symbol = form.get("symbol")?.toString() ?? "";
  const faction = (form.get("faction")?.toString() as FactionSymbol) ?? "";

  const result = await registerAgent({ symbol, faction });

  // Registration error, flash the error message to session storage & refresh
  if (result.status === "error") {
    return flashError({
      flashError: result.message,
      redirectUrl: "/register",
      session,
    });
  }

  // Registration succeeded, set session details & send them to the home page.
  session.set("token", result.data.token);
  session.set("agentSymbol", result.data.agent.symbol);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

/**
 * Register Page Orchestrator
 * Connects the loader, action, and form UI to create the `/register` route
 */
export default function Register({ loaderData }: Route.ComponentProps) {
  const { error } = loaderData;

  return <RegistrationForm error={error} />;
}
