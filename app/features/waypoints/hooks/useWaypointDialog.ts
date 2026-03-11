import { useMemo } from "react";
import { useParams } from "~/hooks";

const ACTION_KEY = "action";
const WAYPOINT_KEY = "waypoint";

/**
 * Custom hook to manage the state of a waypoint action dialog, using URL parameters to track
 * which dialog is open and for which waypoint. The `actionKey` parameter is used to identify
 * which specific dialog the hook is managing (e.g. "ORBIT_SHIP", "DOCK_SHIP", etc.).
 *
 * @param actionKey - A unique string key representing the specific waypoint action dialog to manage.
 * @returns An object containing:
 *   - `isOpen`: A boolean indicating whether the dialog is currently open.
 *   - `params`: The current URL parameters relevant to the dialog (e.g. action & waypoint symbol).
 *   - `openDialog`: A function to open the dialog for a specific waypoint symbol.
 *   - `closeDialog`: A function to close the dialog and clear relevant URL parameters.
 */
export function useWaypointDialog(actionKey: string) {
  const { params, has, setParams } = useParams({
    keys: [ACTION_KEY, WAYPOINT_KEY],
    matchers: {
      [ACTION_KEY]: (value) => value === actionKey,
    },
  });

  const openDialog = (waypointSymbol: string) =>
    setParams({
      [ACTION_KEY]: actionKey,
      [WAYPOINT_KEY]: waypointSymbol,
    });

  const closeDialog = () =>
    setParams({
      [ACTION_KEY]: undefined,
      [WAYPOINT_KEY]: undefined,
    });

  const isOpen = useMemo(() => has(ACTION_KEY), [has]);

  return { isOpen, params, openDialog, closeDialog };
}
