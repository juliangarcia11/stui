import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useWaypointDialog } from "../hooks";
import type { WaypointAction } from "../types";
import { transformWaypointToSystem } from "../utils";

const MARKET_DIALOG_KEY = "OPEN_MARKET";
const MARKET_ACTION_LABEL = "Open Market";

export const OPEN_MARKET_ACTION: WaypointAction = {
  key: MARKET_DIALOG_KEY,
  label: MARKET_ACTION_LABEL,
  disabled: ({ waypoint }) =>
    !waypoint?.traits.some((trait) => trait.symbol === "MARKETPLACE"),
};

export const MarketDialog = () => {
  const { isOpen, params, closeDialog } = useWaypointDialog(MARKET_DIALOG_KEY);
  const waypointSymbol = params.waypoint ?? "";

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Market at {waypointSymbol}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          some description here
        </Dialog.Description>
        Need to fetch market data from
        <br />
        <code>
          {`/systems/${transformWaypointToSystem(waypointSymbol)}/waypoints/${waypointSymbol}/market`}
        </code>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button>Close Market</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
