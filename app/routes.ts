import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/layout/AppPageLayout.tsx", [
    index("routes/dashboard.tsx"),
    route("quickstart", "routes/quickstart.tsx"),

    ...prefix("waypoints", [
      index("routes/waypoints-list.tsx"),
      route(":waypointSymbol/market", "routes/waypoint-market.tsx"),
    ]),
  ]),

  layout("features/auth/AuthLayout.tsx", [
    route("login", "routes/login.tsx"),
    route("register", "routes/register.tsx"),
    route("*", "routes/not-found.tsx"),
  ]),

  route("dev/cache", "routes/dev.cache.tsx"),
] satisfies RouteConfig;
