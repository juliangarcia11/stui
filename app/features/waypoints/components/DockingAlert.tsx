import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { ButtonForm } from "~/components";
import { useShipSelection, useWaypointDialog } from "../hooks";
import type { WaypointAction } from "../types";
import { ShipSelect } from "./ShipSelect";

const DOCK_SHIP_DIALOG_KEY = "DOCK_SHIP";
const DOCK_SHIP_ACTION_LABEL = "Dock Ship";

export const DOCK_SHIP_ACTION: WaypointAction = {
  key: DOCK_SHIP_DIALOG_KEY,
  label: DOCK_SHIP_ACTION_LABEL,
  disabled: ({ waypoint }) =>
    !waypoint.ships?.some(
      (ship) => ship.distance === 0 && ship.nav.status === "IN_ORBIT",
    ),
};

export const DockingAlert = () => {
  const { isOpen, params, closeDialog } =
    useWaypointDialog(DOCK_SHIP_DIALOG_KEY);

  const waypointSymbol = params.waypoint ?? "";
  const {
    ships,
    selectedShipSymbol: shipSymbol,
    setSelectedShipSymbol,
  } = useShipSelection({
    waypointSymbol,
    shipFilter: (ship) => ship.distance === 0 && ship.nav.status === "IN_ORBIT",
  });

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

        <Flex direction="column" gap="4" mt="4" mx="auto" maxWidth="50%">
          <ShipSelect
            ships={ships}
            selectedShipSymbol={shipSymbol}
            setSelectedShipSymbol={setSelectedShipSymbol}
          />
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" onClick={closeDialog}>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <ButtonForm
              action="/waypoints"
              method="POST"
              hiddenValues={{
                action: DOCK_SHIP_DIALOG_KEY,
                shipSymbol,
                waypointSymbol,
              }}
              disabled={!shipSymbol}
              variant="solid"
              color="green"
            >
              Yes, dock ship
            </ButtonForm>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
