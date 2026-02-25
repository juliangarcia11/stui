/**
 * Take a 3 section waypoint symbol & return the 2 section system symbol
 * Note: no validation of the waypoint shape being done at this time
 *
 * @example
 * //  "X1-CB30-A1" => "X1-CB30"
 * const system = transformWaypointToSystem("X1-CB30-A1");
 */
export function transformWaypointToSystem(waypoint: string): string {
  const parts = waypoint.split("-");
  if (parts.length < 3) return waypoint;
  return `${parts[0]}-${parts[1]}`;
}

/**
 * Removes the system prefix from a waypoint symbol, leaving only the unique identifier
 *
 * @example
 * //  "X1-CB30-A1" => "A1"
 * const waypointId = removeSystemPrefix("X1-CB30-A1");
 */
export function removeSystemPrefix(waypoint: string): string {
  const prefix = transformWaypointToSystem(waypoint);
  return waypoint.replace(`${prefix}-`, "");
}
