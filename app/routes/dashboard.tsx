import { DashboardCard } from "~/features/dashboard";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "STUI" },
    { name: "description", content: "Welcome to the SpaceTraders UI!" },
  ];
}

export default function Dashboard() {
  return <DashboardCard />;
}
