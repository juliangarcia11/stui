import { Flex, Text } from "@radix-ui/themes";
import { useEffect, useRef } from "react";
import { ButtonFetcherForm } from "~/components";
import { ClientOnly } from "~/components/ClientOnly";
import { CooldownTimer } from "../components/CooldownTimer";
import { DataRow } from "../components/DataRow";
import type { StepRenderProps } from "../types";

const POLL_INTERVAL_MS = 5000;

export function SellCargoStep({ ctx, onRequestRefresh }: StepRenderProps) {
  const { ship, contract } = ctx;

  if (!ship) return null;

  const requiredSymbols = new Set(
    (contract.terms.deliver ?? []).map((g) => g.tradeSymbol),
  );
  const surplusCargo = ship.cargo.inventory.filter(
    (item) => !requiredSymbols.has(item.symbol),
  );

  const refreshRef = useRef(onRequestRefresh);
  refreshRef.current = onRequestRefresh;

  const isInTransit = ship.nav.status === "IN_TRANSIT";

  useEffect(() => {
    if (!isInTransit) return;
    const id = setInterval(() => refreshRef.current?.(), POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isInTransit]);

  if (surplusCargo.length > 0) {
    return (
      <Flex direction="column" gap="2">
        {surplusCargo.map((item) => (
          <div
            key={item.symbol}
            className="rounded border border-(--gray-4) px-2 py-1.5 flex flex-col gap-2"
          >
            <div className="flex flex-col gap-1">
              <DataRow label="Item" value={item.symbol} />
              <DataRow label="Units" value={String(item.units)} />
            </div>
            <ButtonFetcherForm
              action="/api/contract-flow"
              method="POST"
              hiddenValues={{
                action: "SELL_CARGO",
                shipSymbol: ship.symbol,
                symbol: item.symbol,
                units: String(item.units),
              }}
              color="jade"
              size="1"
              submittingText="Selling…"
            >
              Sell All
            </ButtonFetcherForm>
          </div>
        ))}
      </Flex>
    );
  }

  if (isInTransit) {
    return (
      <Flex direction="column" gap="1">
        <DataRow label="Destination" value={ship.nav.route.destination.symbol} />
        <Flex justify="between" gap="2">
          <Text size="1" color="gray">
            ETA
          </Text>
          <ClientOnly fallback={<Text size="1" color="gray">In transit…</Text>}>
            <CooldownTimer expiration={ship.nav.route.arrival as unknown as string} />
          </ClientOnly>
        </Flex>
      </Flex>
    );
  }

  const destination = contract.terms.deliver?.[0]?.destinationSymbol;
  if (!destination) return null;

  return (
    <Flex direction="column" gap="2">
      <DataRow label="Destination" value={destination} />
      <ButtonFetcherForm
        action="/api/contract-flow"
        method="POST"
        hiddenValues={{
          action: "NAVIGATE_SHIP",
          shipSymbol: ship.symbol,
          waypointSymbol: destination,
        }}
        color="jade"
        size="1"
        submittingText="Navigating…"
      >
        Navigate
      </ButtonFetcherForm>
    </Flex>
  );
}
