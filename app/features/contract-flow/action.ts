import { ContractsApi } from "~/api/contracts";
import { Config } from "~/config";

export async function executeContractFlowAction(
  token: string,
  formData: FormData,
) {
  const action = formData.get("action");

  if (typeof action !== "string") {
    return Config.Errors.MissingAction;
  }

  switch (action) {
    case "DISMISS_QUICKSTART":
      return Config.Errors.MissingActionHandler;

    case "ACCEPT_CONTRACT": {
      const contractId = formData.get("contractId");
      if (typeof contractId !== "string") return Config.Errors.MissingContractId;
      return ContractsApi.acceptContract({ token, contractId });
    }

    case "PURCHASE_SHIP":
    case "NAVIGATE_SHIP":
    case "EXTRACT_RESOURCES":
    case "SELL_CARGO":
    case "DELIVER_CONTRACT":
    case "FULFILL_CONTRACT":
      return Config.Errors.MissingActionHandler;

    default:
      return Config.Errors.MissingActionHandler;
  }
}
