import { Flex, Text } from "@radix-ui/themes";
import { ButtonFetcherForm } from "~/components";
import { numberWithCommas } from "~/utils/numbers";
import { DataRow } from "../components/DataRow";
import type { StepRenderProps } from "../types";

export function PurchaseShipStep({ ctx }: StepRenderProps) {
  if (ctx.ship) {
    return (
      <Text size="1" color="gray">
        {ctx.ship.symbol} · {ctx.ship.registration.role}
      </Text>
    );
  }

  if (ctx.shipOptions.length === 0) {
    return (
      <Text size="1" color="gray">
        No mining ships available in this system.
      </Text>
    );
  }

  return (
    <Flex direction="column" gap="2">
      {ctx.shipOptions.map((option) => (
        <div
          key={`${option.waypointSymbol}-${option.shipType}`}
          className="rounded border border-(--gray-4) px-2 py-1.5 flex flex-col gap-2"
        >
          <div className="flex flex-col gap-1">
            <DataRow label="Ship" value={option.name} />
            <DataRow label="Type" value={option.shipType} />
            <DataRow label="Shipyard" value={option.waypointSymbol} />
            <DataRow
              label="Price"
              value={`${numberWithCommas(option.purchasePrice)} ¢`}
            />
          </div>
          <ButtonFetcherForm
            action="/api/contract-flow"
            method="POST"
            hiddenValues={{
              action: "PURCHASE_SHIP",
              shipType: option.shipType,
              waypointSymbol: option.waypointSymbol,
            }}
            color="jade"
            size="1"
            submittingText="Purchasing..."
          >
            Purchase
          </ButtonFetcherForm>
        </div>
      ))}
    </Flex>
  );
}
