import { wrapErr } from "./api/utils";

/**
 * Config
 * A place for magic primitives and app-wide configuration values.
 * This keeps them centralized and makes it easier to change them in the future.
 */
export const Config = {
  // App Basics
  ApiUrl: "https://api.spacetraders.io/v2",
  AppTitleShort: "STUI",
  AppTitleLong: "SpaceTraders UI",

  // App Header Navigation Items
  Pages: [
    { label: "Contracts", href: "/contracts" },
    { label: "Fleet", href: "/fleet" },
    { label: "Waypoints", href: "/waypoints" },
    { label: "Settings", href: "/settings" },
  ],
  AuthFeaturePages: [
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
  ],

  // App Error Message Strings
  Errors: {
    MissingAgentSymbol: wrapErr("Agent symbol is required"),
    MissingFaction: wrapErr("Faction is required"),
    MissingData: wrapErr("Data missing in response"),
    MissingSystem: wrapErr("System is required"),
    MissingToken: wrapErr("Token is required"),
    MismatchedAgentSymbol: wrapErr(
      "Agent symbol provided does not match token",
    ),
  },
};
