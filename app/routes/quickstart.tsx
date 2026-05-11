import { redirect } from "react-router";
import { loadContractFlowContext } from "~/features/contract-flow/loader";
import { extractToken, withAuth } from "~/sessions.server";
import type { Route } from "./+types/quickstart";

export const loader = withAuth(async ({ request }: Route.LoaderArgs) => {
  const token = await extractToken(request.headers.get("Cookie"));
  if (!token) return redirect("/login");

  const context = await loadContractFlowContext(token);
  return { context };
});

export default function QuickstartPage() {
  return (
    <div>
      <p>The quickstart panel on the right tracks your progress through your first contract.</p>
    </div>
  );
}
