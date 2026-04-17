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
    case "ACCEPT_CONTRACT":
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
