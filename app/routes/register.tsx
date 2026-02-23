import { data, redirect, type Session } from "react-router";
import { RegistrationForm } from "~/features/auth/RegistrationForm";
import { commitSession, getSession, flashError } from "../sessions.server";
import type { Route } from "./+types/login";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("agentId")) {
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
  const faction = form.get("faction")?.toString() ?? "";
  const mockError = form.get("mockError")?.toString() === "true";

  if (!username.length) {
    return flashRegistrationError(session, "Agent name is required");
  }
  if (!faction.length) {
    return flashRegistrationError(session, "Faction is required");
  }

  const agentId = await validateCredentials(username, faction, mockError);

  if (agentId == null) {
    return flashRegistrationError(session, "Invalid agent name or faction");
  }

  session.set("agentId", agentId);

  // Login succeeded, send them to the home page.
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Register({ loaderData }: Route.ComponentProps) {
  const { error } = loaderData;

  return <RegistrationForm error={error} />;
}

async function validateCredentials(
  username: string,
  faction: string,
  mockError: boolean,
) {
  // fake credentials checker for now while I test session stuff
  console.log("Validating...", {
    username,
    faction,
    isValid: mockError || !username.length || !faction.length,
  });

  if (mockError || !username.length || !faction.length) {
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
async function flashRegistrationError(session: Session, message: string) {
  return flashError({
    flashError: message,
    redirectUrl: "/register",
    session,
  });
}
