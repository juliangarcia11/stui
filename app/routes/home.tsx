import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "STUI" },
    { name: "description", content: "Welcome to the SpaceTraders UI!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
