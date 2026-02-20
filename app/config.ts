/**
 * Config
 * A place for magic primitives and app-wide configuration values.
 * This keeps them centralized and makes it easier to change them in the future.
 */
export const Config = {
  ApiUrl: "https://api.spacetraders.io/v2",
  AppTitleShort: "STUI",
  AppTitleLong: "SpaceTraders UI",
  HeaderPages: [
    { label: "Contracts", href: "/contracts" },
    { label: "Fleet", href: "/fleet" },
    { label: "Waypoints", href: "/waypoints" },
    { label: "Settings", href: "/settings" },
  ],
};
