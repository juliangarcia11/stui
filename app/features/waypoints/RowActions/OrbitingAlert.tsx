import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { type FC } from "react";
import { ButtonForm } from "~/components";
import { useWaypointDialog } from "../hooks";
import type { WaypointAction, WaypointActionTemplateProps } from "../types";

const ORBIT_SHIP_DIALOG_KEY = "ORBIT_SHIP";
const ORBIT_SHIP_ACTION_LABEL = "Orbit Ship";

const OrbitingAlertTrigger: FC<WaypointActionTemplateProps> = ({
  waypointSymbol,
}) => {
  const { openDialog } = useWaypointDialog(ORBIT_SHIP_DIALOG_KEY);

  return (
    <span onClick={() => openDialog(waypointSymbol)}>
      {ORBIT_SHIP_ACTION_LABEL}
    </span>
  );
};

export const OrbitingAlert = () => {
  const { isOpen, params, closeDialog } = useWaypointDialog(
    ORBIT_SHIP_DIALOG_KEY,
  );
  const shipSymbol = "";
  const waypointSymbol = params.waypoint ?? "";

  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={(open) => !open && closeDialog()}
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
            <ButtonForm
              action="/waypoints"
              method="POST"
              hiddenValues={{
                shipSymbol,
                waypointSymbol,
              }}
              variant="solid"
              color="green"
            >
              Yes, put in orbit
            </ButtonForm>
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
