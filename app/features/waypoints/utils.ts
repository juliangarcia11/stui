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
