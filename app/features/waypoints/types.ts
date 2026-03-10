import type { FC, ReactNode } from "react";
import type { LoadWaypointsDataResponse } from "./loader-waypoints";

/**
 * Type alias for the UI representation of a waypoint, which extends the API response type to include
 * any additional fields needed for display or interaction in the UI.
 */
export type UIWaypoint =
  LoadWaypointsDataResponse["waypointsList"]["data"][number];

export type WaypointRowActionsProps = {
  waypoint: UIWaypoint;
};

export type ActionKeys =
  | "DOCK_SHIP"
  | "ORBIT_SHIP"
  | "NAVIGATE_SHIP"
  | "REFUEL_SHIP"
  | "DELIVER_CONTRACT"
  | "JUMP_SYSTEM"
  | "SURVEY_WAYPOINT"
  | "MINE_WAYPOINT"
  | "OPEN_MARKET"
  | "OPEN_SHIPYARD";

export type WaypointAction = {
  // using template literal type to allow for separator items with unique keys
  key: ActionKeys | `SEPARATOR_${string}`;
  // label for the action, e.g. "Navigate Ship Here", "Open Market", etc.
  label: string;
  // can be a boolean or a function that takes the row props and returns a boolean for dynamic enabling/disabling
  disabled?: boolean | ((props: WaypointRowActionsProps) => boolean);
  // later, could add keyboard shortcuts to actions
  shortcut?: string;
  // menu item template for this action, if it requires a custom component (e.g. a dialog trigger)
  template?: FC;
  // optional custom content to add outside of the menu, e.g. a dialog component that listens to URL params for open/close state
  dialog?: FC;
};
