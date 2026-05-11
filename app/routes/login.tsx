import { data, redirect } from "react-router";
import { API } from "~/api";
import { ErrorBoundary } from "~/components";
import { LoginForm } from "~/features/auth";
import { TokenResetError } from "~/errors";
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

  let result;
  try {
    result = await API.Agent.loginAgent({ symbol, token });
  } catch (e) {
    if (e instanceof TokenResetError) {
      return flashError({
        flashError:
          "The SpaceTraders server has reset — please register a new agent.",
        redirectUrl: "/register",
        session,
      });
    }
    throw e;
  }

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

/**
 * Reusable error boundary for errors in the loader, component, or actions.
 */
export { ErrorBoundary };
