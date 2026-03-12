import type { FC } from "react";
import { useWaypointDialog } from "../hooks";
import type { ActionKeys } from "../types";

type WaypointDialogTriggerProps = {
  actionKey: ActionKeys;
  actionLabel: string;
  waypointSymbol: string;
};

/**
 * Generic trigger component for waypoint action dialogs. Updates URL params to tell the UI to open a particular dialog focused on a particular waypoint.
 * The actual dialog components listen for these URL param changes and open/close themselves accordingly.
 */
export const WaypointDialogTrigger: FC<WaypointDialogTriggerProps> = ({
  actionKey,
  actionLabel,
  waypointSymbol,
}) => {
  const { openDialog } = useWaypointDialog(actionKey);

  return <span onClick={() => openDialog(waypointSymbol)}>{actionLabel}</span>;
};
