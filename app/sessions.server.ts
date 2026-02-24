import {
  createCookieSessionStorage,
  redirect,
  type Session,
} from "react-router";

type SessionData = {
  token: string;
  agentSymbol: string;
};

type SessionFlashData = {
  /**
   * General session error message
   */
  error: string;
};

/**
 * @source https://reactrouter.com/explanation/sessions-and-cookies#using-sessions
 */
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",

      // all of these are optional
      // domain: "reactrouter.com",
      // Expires can also be set (although maxAge overrides it when used in combination).
      // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
      //
      // expires: new Date(Date.now() + 60_000),
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 14, // 60 sec/min * 60 min/hr * 24 hr/day * 14 days
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"], // TODO
      secure: true,
    },
  });

export { commitSession, destroySession, getSession };

// ===========================================================
// ===========================================================
// ===========================================================
// My own helpers for sessions
// ===========================================================
// ===========================================================
// ===========================================================

export type FlashErrorParams = {
  session: Session;
  flashKey?: string;
  flashError: string;
  redirectUrl: `/${string}`;
};

/**
 * Store an error in the session flash data & redirect.
 *
 * If multiple session errors are needed at once, each must be keyed uniquely.
 * Add these keys to `SessionFlashData` type in `app\sessions.server.ts`
 *
 * More info: https://reactrouter.com/explanation/sessions-and-cookies#session-gotchas
 * @example
 * // reusable helper for a given route (replace 'route' with whatever)
 * function flashRouteError(session: Session, message: string) {
 *  return flashError({
 *    flashKey: "error",
 *    flashError: message,
 *    redirectUrl: "/route",
 *    session,
 *  })
 * }
 */
export async function flashError({
  session,
  flashKey = "error",
  flashError = "Invalid form values",
  redirectUrl = "/",
}: FlashErrorParams) {
  session.flash(flashKey, flashError);

  // Redirect back to the login page with errors.
  return redirect(redirectUrl, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
