import { useMemo, useState } from "react";
import type { UIWaypoint } from "../types";
import { useWaypointsData } from "./useWaypointsData";

type UseShipSelectionParams = {
  waypointSymbol: string;
  shipFilter?: (ship: UIWaypoint["ships"][number]) => boolean;
};

export type UseShipSelectionReturn = {
  ships: UIWaypoint["ships"];
  selectedShipSymbol: string | undefined;
  setSelectedShipSymbol: (symbol: string) => void;
};

/**
 * Custom hook to manage selected ship state for waypoint actions that require a ship selection (e.g. orbiting, docking, refueling).
 * It retrieves the list of ships at the specified waypoint from the waypoints data context, applies an optional filter, and manages the selected ship symbol state.
 * @param waypointSymbol - the symbol of the waypoint for which to retrieve ships
 * @param shipFilter - an optional function to filter the ships at the waypoint (e.g. only show docked ships for orbiting)
 * @returns an object containing:
 *   - ships: the list of ships at the waypoint after applying the optional filter
 *   - selectedShipSymbol: the symbol of the currently selected ship, or undefined if no ship is selected
 *   - setSelectedShipSymbol: a function to update the selected ship symbol
 */
export function useShipSelection({
  waypointSymbol,
  shipFilter,
}: UseShipSelectionParams) {
  const { waypointsList } = useWaypointsData();
  const shipsList =
    waypointsList.data.find((wp) => wp.symbol === waypointSymbol)?.ships ?? [];
  const ships = useMemo(
    () => (shipFilter ? shipsList.filter(shipFilter) : shipsList),
    [shipsList, shipFilter],
  );
  const [selectedShipSymbol, setSelectedShipSymbol] = useState<string>();

  return {
    ships,
    selectedShipSymbol,
    setSelectedShipSymbol,
  };
}
