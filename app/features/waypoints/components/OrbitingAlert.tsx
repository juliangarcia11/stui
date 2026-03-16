import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { ButtonForm } from "~/components";
import { useDialogParams } from "~/hooks";
import { useShipSelection } from "../hooks/useShipSelection";
import type { WaypointAction } from "../types";
import { ShipSelect } from "./ShipSelect";
import { useEffect } from "react";

const ORBIT_SHIP_DIALOG_KEY = "ORBIT_SHIP";
const ORBIT_SHIP_ACTION_LABEL = "Orbit Ship";

export const ORBIT_SHIP_ACTION: WaypointAction = {
  key: ORBIT_SHIP_DIALOG_KEY,
  label: "Orbit Ship",
  disabled: ({ waypoint }) =>
    !waypoint.ships?.some(
      (ship) => ship.distance === 0 && ship.nav.status === "DOCKED",
    ),
};

/**
 * Dialog for selecting a ship to send into orbit. Only shows ships that are currently docked at the waypoint.
 * Uses a form to submit the selected ship and waypoint to the server to perform the action.
 */
export const OrbitingAlert = () => {
  const { isOpen, params, closeDialog } = useDialogParams({
    dialogKey: ORBIT_SHIP_DIALOG_KEY,
    extraKeys: ["waypoint", "ship"],
  });
  const waypointSymbol = params.waypoint ?? "";
  const initialSelectedShip = params.ship;
  const {
    ships,
    selectedShipSymbol: shipSymbol,
    setSelectedShipSymbol,
  } = useShipSelection({
    initialSelectedShip,
    waypointSymbol,
    shipFilter: (ship) => ship.distance === 0 && ship.nav.status === "DOCKED",
  });

  // When the dialog opens, if there is an initial selected ship from the params and no ship is currently selected, set it as the selected ship.
  useEffect(() => {
    if (isOpen && initialSelectedShip && !shipSymbol) {
      setSelectedShipSymbol(initialSelectedShip);
    }
  }, [isOpen, initialSelectedShip, shipSymbol, setSelectedShipSymbol]);

  // When the dialog closes, reset the selected ship symbol to undefined to clear the selection for the next time the dialog is opened.
  useEffect(() => {
    if (!isOpen) {
      setSelectedShipSymbol(undefined);
    }
  }, [isOpen, setSelectedShipSymbol]);

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

        <Flex direction="column" gap="4" mt="4" mx="auto" maxWidth="50%">
          <ShipSelect
            ships={ships}
            selectedShipSymbol={shipSymbol}
            setSelectedShipSymbol={setSelectedShipSymbol}
          />
        </Flex>

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
                action: ORBIT_SHIP_DIALOG_KEY,
                shipSymbol,
                waypointSymbol,
              }}
              disabled={!shipSymbol}
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
