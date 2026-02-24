import { data, redirect, type Session } from "react-router";
import { loginAgent, LoginForm } from "~/features/auth";
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
 * Login form submission action
 * 1. Extract form data from the request
 * 2. Attempt login
 * 3. Flash error to session storage, or
 * 4. Set user session & redirect to `/`
 */
export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const symbol = form.get("symbol")?.toString() ?? "";
  const token = form.get("token")?.toString() ?? "";

  const result = await loginAgent({
    symbol,
    token,
  });

  // Login error, flash the error message to session storage & refresh
  if (result.status === "error") {
    return flashError({
      flashError: result.message,
      redirectUrl: "/login",
      session,
    });
  }

  // Login succeeded, set session details & send them to the home page.
  session.set("token", result.data.token);
  session.set("agentSymbol", result.data.symbol);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login({ loaderData }: Route.ComponentProps) {
  const { error } = loaderData;

  return <LoginForm error={error} />;
}
