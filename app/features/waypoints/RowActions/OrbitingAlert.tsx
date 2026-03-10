import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useDialog } from "../../../hooks";
import type { WaypointAction } from "../types";

const ORBIT_SHIP_DIALOG_KEY = "ORBIT_SHIP";
const ORBIT_SHIP_ACTION_LABEL = "Orbit Ship";

const OrbitingAlertTrigger = () => {
  const { openDialog } = useDialog(ORBIT_SHIP_DIALOG_KEY);

  return <span onClick={openDialog}>{ORBIT_SHIP_ACTION_LABEL}</span>;
};

export const OrbitingAlert = () => {
  const { isOpen, openDialog, closeDialog } = useDialog(ORBIT_SHIP_DIALOG_KEY);

  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={(open) => (open ? openDialog() : closeDialog())}
    >
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{ORBIT_SHIP_ACTION_LABEL}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to put your ship in orbit? You will no longer be
          able to make purchases, sell cargo, or interact with the waypoint
          until you dock again.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel onClick={closeDialog}>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="green">
              Yes, put in orbit
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export const ORBIT_SHIP_ACTION: WaypointAction = {
  key: ORBIT_SHIP_DIALOG_KEY,
  label: "Orbit Ship",
  disabled: ({ waypoint }) =>
    !waypoint.ships?.some(
      (ship) => ship.distance === 0 && ship.nav.status === "DOCKED",
    ),
  template: OrbitingAlertTrigger,
};
