import { redirect } from "react-router";
import { executeContractFlowAction } from "~/features/contract-flow/action";
import { extractToken } from "~/sessions.server";
import type { Route } from "./+types/api.contract-flow";

export async function action({ request }: Route.ActionArgs) {
  const token = await extractToken(request.headers.get("Cookie"));
  if (!token) return redirect("/login");

  const formData = await request.formData();
  return executeContractFlowAction(token, formData);
}
