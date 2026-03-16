import { useLoaderData } from "react-router";
import { type LoadWaypointsDataResponse } from "../loader";

/**
 * Custom hook to access the data loaded by the Waypoints route's loader function.
 *
 * @returns The data loaded by the loader function, including:
 *   - agent information,
 *   - system information
 *   - a list of waypoints
 */
export function useWaypointsData() {
  const data = useLoaderData<LoadWaypointsDataResponse>();
  return data;
}
