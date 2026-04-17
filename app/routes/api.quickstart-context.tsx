import { data } from "react-router";
import { loadContractFlowContext } from "~/features/contract-flow/loader";
import { extractToken, getQuickstartDismissed } from "~/sessions.server";
import type { Route } from "./+types/api.quickstart-context";

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const token = await extractToken(cookieHeader);

  if (!token) {
    return data({ context: null, dismissed: false, dismissedContractId: null });
  }

  const [context, dismissedContractId] = await Promise.all([
    loadContractFlowContext(token),
    getQuickstartDismissed(cookieHeader),
  ]);

  const dismissed =
    dismissedContractId !== null &&
    context?.contract.id === dismissedContractId;

  return data({ context, dismissed, dismissedContractId });
}
