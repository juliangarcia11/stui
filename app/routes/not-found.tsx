import { NotFoundCard } from "~/components";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Not Found" },
    {
      name: "description",
      content: "The page you are looking for could not be found.",
    },
  ];
}

export default function NotFound() {
  return <NotFoundCard />;
}
