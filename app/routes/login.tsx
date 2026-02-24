import { data, redirect, type Session } from "react-router";
import { LoginForm } from "~/features/auth";
import { commitSession, flashError, getSession } from "../sessions.server";
import type { Route } from "./+types/login";

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

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const username = form.get("username")?.toString() ?? "";
  const token = form.get("token")?.toString() ?? "";
  const mockError = form.get("mockError")?.toString() === "true";

  if (!username.length) {
    return flashLoginError(session, "Agent name is required");
  }
  if (!token.length) {
    return flashLoginError(session, "Token is required");
  }

  const agentId = await validateCredentials(username, token, mockError);

  if (agentId == null) {
    return flashLoginError(session, "Invalid username or token");
  }

  session.set("agentSymbol", agentId);

  // Login succeeded, send them to the home page.
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

async function validateCredentials(
  username: string,
  token: string,
  mockError: boolean,
) {
  // fake credentials checker for now while I test session stuff
  console.log("Validating...", {
    username,
    token,
    isValid: mockError || !username.length || !token.length,
  });

  if (mockError || !username.length || !token.length) {
    return null;
  }

  return username;
}

/**
 * Route helper to flash error message to the session & reload the page for display
 * @param session Browser session
 * @param message Error message
 * @returns Redirect
 */
async function flashLoginError(session: Session, message: string) {
  return flashError({
    flashError: message,
    redirectUrl: "/login",
    session,
  });
}
