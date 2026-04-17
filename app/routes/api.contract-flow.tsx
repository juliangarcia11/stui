import { data, redirect } from "react-router";
import { executeContractFlowAction } from "~/features/contract-flow/action";
import {
  clearQuickstartDismissed,
  extractToken,
  setQuickstartDismissed,
} from "~/sessions.server";
import type { Route } from "./+types/api.contract-flow";

export async function action({ request }: Route.ActionArgs) {
  const token = await extractToken(request.headers.get("Cookie"));
  if (!token) return redirect("/login");

  const formData = await request.formData();
  const actionKey = formData.get("action");

  if (actionKey === "DISMISS_QUICKSTART") {
    const contractId = formData.get("contractId")?.toString() ?? "";
    const cookieHeader = await setQuickstartDismissed(contractId);
    return data(
      { status: "success" as const },
      { headers: { "Set-Cookie": cookieHeader } },
    );
  }

  if (actionKey === "REOPEN_QUICKSTART") {
    const cookieHeader = await clearQuickstartDismissed();
    return data(
      { status: "success" as const },
      { headers: { "Set-Cookie": cookieHeader } },
    );
  }

  return executeContractFlowAction(token, formData);
}
