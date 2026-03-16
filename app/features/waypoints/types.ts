import type { LoadWaypointsDataResponse } from "./loader";

export type ActionKeys =
  | "DOCK_SHIP"
  | "ORBIT_SHIP"
  | "NAVIGATE_SHIP"
  | "REFUEL_SHIP"
  | "DELIVER_CONTRACT"
  | "JUMP_SYSTEM"
  | "SURVEY_WAYPOINT"
  | "MINE_WAYPOINT";

/**
 * Type alias for the UI representation of a waypoint, which extends the API response type to include
 * any additional fields needed for display or interaction in the UI.
 */
export type UIWaypoint =
  LoadWaypointsDataResponse["waypointsList"]["data"][number];

export type WaypointRowActionsProps = {
  waypoint: UIWaypoint;
};

export type WaypointAction = {
  // using template literal type to allow for separator items with unique keys
  key: ActionKeys | `SEPARATOR_${string}`;
  // label for the action, e.g. "Navigate Ship Here", "Open Market", etc.
  label: string;
  // can be a boolean or a function that takes the row props and returns a boolean for dynamic enabling/disabling
  disabled?: boolean | ((props: WaypointRowActionsProps) => boolean);
  // later, could add keyboard shortcuts to actions
  shortcut?: string;
};

/**
 * Shared parameter type for all Waypoint Action handlers outlined in executeWaypointAction.
 * Each action handler will receive an object of this type, which includes all possible parameters needed for any action.
 * Individual handlers will be responsible for validating the presence of required parameters for their specific action
 * and can ignore the rest.
 */
export type WaypointActionParams = {
  token: string;
  shipSymbol?: string;
  waypointSymbol?: string;
};
