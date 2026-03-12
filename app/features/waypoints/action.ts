import { orbitShip } from "~/api";
import { Config } from "~/config";
import type { WaypointActionParams } from "./types";

/**
 * Execute a waypoint action based on the provided form data.
 * The form data must include an "action" key that specifies the action to perform.
 * Depending on the action, additional keys may be required (e.g. "shipSymbol" for ORBIT_SHIP).
 * This is purely an orchestration function that validates the action key and routes to the appropriate API calls for each action.
 * Each action is responsible for its own validation of required parameters and error handling.
 */
export function executeWaypointAction(token: string, formData: FormData) {
  const action = formData.get("action");
  const shipSymbol = formData.get("shipSymbol")?.toString() ?? "";
  const waypointSymbol = formData.get("waypointSymbol")?.toString() ?? "";

  // all actions require an action key, so we check for that first
  // other validation (e.g. checking for shipSymbol for ORBIT_SHIP) will be handled in the individual action handlers
  if (typeof action !== "string") {
    return Config.Errors.MissingAction;
  }

  const params: WaypointActionParams = {
    token,
    shipSymbol,
    waypointSymbol,
  };

  switch (action) {
    case "ORBIT_SHIP":
      return orbitShip(params);
    default:
      return Config.Errors.MissingActionHandler;
  }
}
