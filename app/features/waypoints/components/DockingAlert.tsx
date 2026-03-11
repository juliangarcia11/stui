import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import type { FC } from "react";
import { useWaypointDialog } from "../hooks";
import type { WaypointAction, WaypointActionTemplateProps } from "../types";

const DOCK_SHIP_DIALOG_KEY = "DOCK_SHIP";
const DOCK_SHIP_ACTION_LABEL = "Dock Ship";

const DockingAlertTrigger: FC<WaypointActionTemplateProps> = ({
  waypointSymbol,
}) => {
  const { openDialog } = useWaypointDialog(DOCK_SHIP_DIALOG_KEY);

  return (
    <span onClick={() => openDialog(waypointSymbol)}>
      {DOCK_SHIP_ACTION_LABEL}
    </span>
  );
};

export const DockingAlert = () => {
  const { isOpen, closeDialog } = useWaypointDialog(DOCK_SHIP_DIALOG_KEY);

  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={(open) => !open && closeDialog()}
    >
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{DOCK_SHIP_ACTION_LABEL}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to dock your ship? You will no longer be able to
          travel to a different waypoint until you undock.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" onClick={closeDialog}>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="green">
              Yes, dock ship
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export const DOCK_SHIP_ACTION: WaypointAction = {
  key: DOCK_SHIP_DIALOG_KEY,
  label: DOCK_SHIP_ACTION_LABEL,
  disabled: ({ waypoint }) =>
    !waypoint.ships?.some(
      (ship) => ship.distance === 0 && ship.nav.status === "IN_ORBIT",
    ),
  template: DockingAlertTrigger,
};
