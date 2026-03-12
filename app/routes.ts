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

    ...prefix("waypoints", [
      index("routes/waypoints-list.tsx"),
      route(":waypointSymbol/marketplace", "routes/waypoint-marketplace.tsx"),
    ]),
  ]),

  layout("features/auth/AuthLayout.tsx", [
    route("login", "routes/login.tsx"),
    route("register", "routes/register.tsx"),
    route("*", "routes/not-found.tsx"),
  ]),
] satisfies RouteConfig;
