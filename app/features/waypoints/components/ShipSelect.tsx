import { Select } from "@radix-ui/themes";
import type { FC } from "react";
import type { UseShipSelectionReturn } from "../hooks";

/**
 * Component for selecting a ship from a list of ships at a waypoint.
 * Does not contain state logic itself, but relies on the parent component
 * to manage the selected ship symbol state and provide the list of ships to display.
 */
export const ShipSelect: FC<UseShipSelectionReturn> = ({
  ships,
  selectedShipSymbol,
  setSelectedShipSymbol,
}) => {
  return (
    <Select.Root
      value={selectedShipSymbol}
      onValueChange={setSelectedShipSymbol}
    >
      <Select.Trigger placeholder="Select a ship" />
      <Select.Content>
        {ships.map((ship) => (
          <Select.Item key={ship.symbol} value={ship.symbol}>
            {ship.symbol}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
