import { data, redirect } from "react-router";
import { RegistrationForm } from "~/features/auth/RegistrationForm";
import { commitSession, getSession } from "../sessions.server";
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
  const token = form.get("token")?.toString() ?? "";
  const mockError = form.get("mockError")?.toString() === "true";

  const agentId = await validateCredentials(username, token, mockError);

  if (agentId == null) {
    session.flash("error", "Invalid username/token");

    // Redirect back to the login page with errors.
    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
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
