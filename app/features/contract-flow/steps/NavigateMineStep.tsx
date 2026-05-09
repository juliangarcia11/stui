import { Flex, Text } from "@radix-ui/themes";
import { useEffect } from "react";
import { ButtonFetcherForm } from "~/components";
import { ClientOnly } from "~/components/ClientOnly";
import { calculateDistance } from "~/features/waypoints";
import { CooldownTimer } from "../components/CooldownTimer";
import { DataRow } from "../components/DataRow";
import type { StepRenderProps } from "../types";

const ASTEROID_TYPES = new Set(["ASTEROID", "ENGINEERED_ASTEROID"]);
const POLL_INTERVAL_MS = 5000;

export function NavigateMineStep({ ctx, onRequestRefresh }: StepRenderProps) {
  const { ship, waypoints, contract, shipCooldown } = ctx;

  if (!ship) return null;

  const isInTransit = ship.nav.status === "IN_TRANSIT";
  const currentWaypoint = waypoints.find((w) => w.symbol === ship.nav.waypointSymbol);
  const isAtAsteroid = currentWaypoint !== undefined && ASTEROID_TYPES.has(currentWaypoint.type);
  const asteroidWaypoints = waypoints.filter((w) => ASTEROID_TYPES.has(w.type));

  useEffect(() => {
    if (!isInTransit || !onRequestRefresh) return;
    const id = setInterval(onRequestRefresh, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isInTransit, onRequestRefresh]);

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

  if (isAtAsteroid) {
    const deliverGoods = contract.terms.deliver ?? [];
    const hasCooldown =
      shipCooldown !== null && shipCooldown.remainingSeconds > 0;

    return (
      <Flex direction="column" gap="2">
        {deliverGoods.map((good) => {
          const inCargo =
            ship.cargo.inventory.find((i) => i.symbol === good.tradeSymbol)
              ?.units ?? 0;
          const needed = Math.max(0, good.unitsRequired - good.unitsFulfilled);
          return (
            <div key={good.tradeSymbol} className="flex flex-col gap-1">
              <DataRow label="Good" value={good.tradeSymbol} />
              <DataRow label="In cargo" value={`${inCargo} / ${needed}`} />
            </div>
          );
        })}
        {hasCooldown && shipCooldown!.expiration ? (
          <Flex justify="between" gap="2">
            <Text size="1" color="gray">
              Cooldown
            </Text>
            <ClientOnly
              fallback={<Text size="1" color="gray">On cooldown</Text>}
            >
              <CooldownTimer expiration={shipCooldown!.expiration} />
            </ClientOnly>
          </Flex>
        ) : (
          <ButtonFetcherForm
            action="/api/contract-flow"
            method="POST"
            hiddenValues={{
              action: "EXTRACT_RESOURCES",
              shipSymbol: ship.symbol,
            }}
            color="jade"
            size="1"
            submittingText="Extracting…"
          >
            Extract Resources
          </ButtonFetcherForm>
        )}
      </Flex>
    );
  }

  if (asteroidWaypoints.length === 0) {
    return (
      <Text size="1" color="gray">
        No asteroid waypoints found in this system.
      </Text>
    );
  }

  return (
    <Flex direction="column" gap="2">
      {asteroidWaypoints.map((waypoint) => {
        const distance = currentWaypoint
          ? calculateDistance(currentWaypoint.x, currentWaypoint.y, waypoint.x, waypoint.y)
          : null;

        return (
        <div
          key={waypoint.symbol}
          className="rounded border border-(--gray-4) px-2 py-1.5 flex flex-col gap-2"
        >
          <div className="flex flex-col gap-1">
            <DataRow label="Waypoint" value={waypoint.symbol} />
            <DataRow label="Type" value={waypoint.type} />
            {distance !== null && (
              <DataRow label="Distance" value={String(distance)} />
            )}
          </div>
          <ButtonFetcherForm
            action="/api/contract-flow"
            method="POST"
            hiddenValues={{
              action: "NAVIGATE_SHIP",
              shipSymbol: ship.symbol,
              waypointSymbol: waypoint.symbol,
            }}
            color="jade"
            size="1"
            submittingText="Navigating…"
          >
            Navigate
          </ButtonFetcherForm>
        </div>
        );
      })}
    </Flex>
  );
}
