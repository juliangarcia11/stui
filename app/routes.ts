import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/dashboard.tsx"),

  layout("features/auth/AuthLayout.tsx", [
    route("login", "routes/login.tsx"),
    route("register", "routes/register.tsx"),
  ]),

  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
