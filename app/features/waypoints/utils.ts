import type { Ship, System } from "~/api/client";

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

/**
 * Calculates the distance between two points in a 2D space using the distance formula.
 */
export function calculateDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  const dx = x2 - x1; // Difference in x-coordinates
  const dy = y2 - y1; // Difference in y-coordinates
  return +Math.sqrt(dx * dx + dy * dy).toFixed(0) as unknown as number; // Return the distance rounded to the nearest whole number
}

/**
 * Create a Map of waypoint symbols to their coordinates for quick lookup when calculating ship distances to waypoints.
 */
export function preprocessWaypoints(waypoints: System["waypoints"]) {
  const waypointMap = new Map<string, { x: number; y: number }>();
  waypoints.forEach((waypoint) => {
    waypointMap.set(waypoint.symbol, { x: waypoint.x, y: waypoint.y });
  });
  return waypointMap;
}

/**
 * For each waypoint in the system, find the agent's ships that are currently in the same system and calculate their distance to the waypoint.
 * This allows us to display the nearest ships to each waypoint without needing to make additional API calls for each ship or waypoint.
 */
export function mapWaypointsWithShips(systemInfo: System, ships: Ship[]) {
  const waypointMap = preprocessWaypoints(systemInfo.waypoints);

  return {
    ...systemInfo,
    waypoints: systemInfo.waypoints.map((waypoint) => {
      const shipsInSystem = ships
        .filter((ship) => ship.nav.systemSymbol === systemInfo.symbol)
        .map((ship) => {
          const shipWaypoint = waypointMap.get(ship.nav.waypointSymbol);
          if (!shipWaypoint) return null;

          return {
            ...ship,
            distance: calculateDistance(
              waypoint.x,
              waypoint.y,
              shipWaypoint.x,
              shipWaypoint.y,
            ),
          };
        })
        .filter((ship) => ship !== null) // Remove null values for ships not found in the map
        .sort((a, b) => (a!.distance > b!.distance ? 1 : -1)); // Sort by distance

      return {
        ...waypoint,
        ships: shipsInSystem,
      };
    }),
  };
}
