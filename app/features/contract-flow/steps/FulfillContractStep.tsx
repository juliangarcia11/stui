import { Flex, Text } from "@radix-ui/themes";
import { ButtonFetcherForm } from "~/components";
import { DataRow } from "../components/DataRow";
import type { StepRenderProps } from "../types";

export function FulfillContractStep({ ctx }: StepRenderProps) {
  const { ship, contract } = ctx;

  if (!ship) return null;

  const deliverGoods = contract.terms.deliver ?? [];
  const allDelivered = deliverGoods.every(
    (g) => g.unitsFulfilled >= g.unitsRequired,
  );

  if (!allDelivered) {
    const itemsToDeliver = deliverGoods.flatMap((good) => {
      const inCargo =
        ship.cargo.inventory.find((i) => i.symbol === good.tradeSymbol)
          ?.units ?? 0;
      if (inCargo === 0) return [];
      const units = Math.min(inCargo, good.unitsRequired - good.unitsFulfilled);
      return [{ good, units }];
    });

    return (
      <Flex direction="column" gap="2">
        <div className="flex flex-col gap-1">
          {deliverGoods.map((good) => (
            <DataRow
              key={good.tradeSymbol}
              label={good.tradeSymbol}
              value={`${good.unitsFulfilled} / ${good.unitsRequired}`}
            />
          ))}
        </div>
        {itemsToDeliver.length > 0 ? (
          itemsToDeliver.map(({ good, units }) => (
            <ButtonFetcherForm
              key={good.tradeSymbol}
              action="/api/contract-flow"
              method="POST"
              hiddenValues={{
                action: "DELIVER_CONTRACT",
                contractId: contract.id,
                shipSymbol: ship.symbol,
                tradeSymbol: good.tradeSymbol,
                units: String(units),
              }}
              color="jade"
              size="1"
              submittingText="Delivering…"
            >
              Deliver {good.tradeSymbol}
            </ButtonFetcherForm>
          ))
        ) : (
          <Text size="1" color="gray">
            No goods in cargo to deliver.
          </Text>
        )}
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="2">
      <Text size="1" color="gray">
        All goods delivered.
      </Text>
      <ButtonFetcherForm
        action="/api/contract-flow"
        method="POST"
        hiddenValues={{
          action: "FULFILL_CONTRACT",
          contractId: contract.id,
        }}
        color="jade"
        size="1"
        submittingText="Fulfilling…"
      >
        Fulfill Contract
      </ButtonFetcherForm>
    </Flex>
  );
}
