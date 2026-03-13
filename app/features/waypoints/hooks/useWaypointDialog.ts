import { useDialogParams } from "~/hooks";

const WAYPOINT_KEY = "waypoint";

/**
 * Custom hook to manage the state of a waypoint action dialog, using URL parameters to track
 * which dialog is open and for which waypoint. The `actionKey` parameter is used to identify
 * which specific dialog the hook is managing (e.g. "ORBIT_SHIP", "DOCK_SHIP", etc.).
 *
 * @param actionKey - A unique string key representing the specific waypoint action dialog to manage.
 * @see useDialogParams for the underlying implementation of dialog open/closed state management
 */
export function useWaypointDialog(actionKey: string) {
  const {
    isOpen,
    params,
    closeDialog,
    openDialog: _openDialog,
  } = useDialogParams({
    dialogKey: actionKey,
    extraKeys: [WAYPOINT_KEY],
  });

  const openDialog = (waypointSymbol: string) =>
    _openDialog({
      [WAYPOINT_KEY]: waypointSymbol,
    });

  return { isOpen, params, openDialog, closeDialog };
}
