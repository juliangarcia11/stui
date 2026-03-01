import type { LoadWaypointsDataResponse } from "./loader-waypoints";

/**
 * Type alias for the UI representation of a waypoint, which extends the API response type to include
 * any additional fields needed for display or interaction in the UI.
 */
export type UIWaypoint =
  LoadWaypointsDataResponse["waypointsList"]["data"][number];
