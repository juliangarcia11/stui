import { ContractsApi } from "~/api/contracts";
import { FleetApi } from "~/api/fleet";
import { Config } from "~/config";
import type { ShipType, TradeSymbol } from "~/api/client";

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

    case "PURCHASE_SHIP": {
      const shipType = formData.get("shipType");
      const waypointSymbol = formData.get("waypointSymbol");
      if (typeof shipType !== "string") return Config.Errors.MissingShip;
      if (typeof waypointSymbol !== "string") return Config.Errors.MissingWaypoint;
      return FleetApi.purchaseShip({ token, shipType: shipType as ShipType, waypointSymbol });
    }

    case "NAVIGATE_SHIP": {
      const shipSymbol = formData.get("shipSymbol");
      const waypointSymbol = formData.get("waypointSymbol");
      if (typeof shipSymbol !== "string") return Config.Errors.MissingShip;
      if (typeof waypointSymbol !== "string") return Config.Errors.MissingWaypoint;
      await FleetApi.orbitShip({ token, shipSymbol });
      return FleetApi.navigateShip({ token, shipSymbol, waypointSymbol });
    }

    case "EXTRACT_RESOURCES": {
      const shipSymbol = formData.get("shipSymbol");
      if (typeof shipSymbol !== "string") return Config.Errors.MissingShip;
      await FleetApi.orbitShip({ token, shipSymbol });
      return FleetApi.extractResources({ token, shipSymbol });
    }

    case "SELL_CARGO": {
      const shipSymbol = formData.get("shipSymbol");
      const symbol = formData.get("symbol");
      const units = formData.get("units");
      if (typeof shipSymbol !== "string") return Config.Errors.MissingShip;
      if (typeof symbol !== "string" || typeof units !== "string")
        return Config.Errors.MissingData;
      await FleetApi.dockShip({ token, shipSymbol });
      return FleetApi.sellCargo({
        token,
        shipSymbol,
        symbol: symbol as TradeSymbol,
        units: Number(units),
      });
    }

    case "DELIVER_CONTRACT": {
      const contractId = formData.get("contractId");
      const shipSymbol = formData.get("shipSymbol");
      const tradeSymbol = formData.get("tradeSymbol");
      const units = formData.get("units");
      if (typeof contractId !== "string") return Config.Errors.MissingContractId;
      if (typeof shipSymbol !== "string") return Config.Errors.MissingShip;
      if (typeof tradeSymbol !== "string" || typeof units !== "string")
        return Config.Errors.MissingData;
      await FleetApi.dockShip({ token, shipSymbol });
      return ContractsApi.deliverContract({
        token,
        contractId,
        shipSymbol,
        tradeSymbol,
        units: Number(units),
      });
    }

    case "FULFILL_CONTRACT": {
      const contractId = formData.get("contractId");
      if (typeof contractId !== "string") return Config.Errors.MissingContractId;
      return ContractsApi.fulfillContract({ token, contractId });
    }

    default:
      return Config.Errors.MissingActionHandler;
  }
}
