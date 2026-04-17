import type { ContractFlowStep } from "./types";

const ASTEROID_TYPES = ["ASTEROID", "ENGINEERED_ASTEROID"] as const;

export const CONTRACT_FLOW_STEPS: ContractFlowStep[] = [
  {
    key: "agent-overview",
    label: "Agent Overview",
    isComplete: (ctx) => Boolean(ctx.agent.symbol),
  },
  {
    key: "starting-location",
    label: "Starting Location",
    isComplete: (ctx) => ctx.waypoints.length > 0,
  },
  {
    key: "accept-contract",
    label: "Accept Contract",
    isComplete: (ctx) => ctx.contract.accepted,
  },
  {
    key: "purchase-ship",
    label: "Purchase Ship",
    isComplete: (ctx) => ctx.ship !== null,
  },
  {
    key: "navigate-to-asteroid",
    label: "Navigate to Asteroid",
    isComplete: (ctx) => {
      if (!ctx.ship) return false;
      if (ctx.ship.nav.status === "IN_TRANSIT") return false;
      const current = ctx.waypoints.find(
        (w) => w.symbol === ctx.ship!.nav.waypointSymbol,
      );
      return current !== undefined && ASTEROID_TYPES.includes(current.type as (typeof ASTEROID_TYPES)[number]);
    },
  },
  {
    key: "extract-resources",
    label: "Extract Resources",
    isComplete: (ctx) => {
      if (!ctx.ship) return false;
      const deliverGoods = ctx.contract.terms.deliver ?? [];
      if (deliverGoods.length === 0) return false;
      return deliverGoods.some((good) => {
        const needed = good.unitsRequired - good.unitsFulfilled;
        if (needed <= 0) return true;
        const cargoItem = ctx.ship!.cargo.inventory.find(
          (i) => i.symbol === good.tradeSymbol,
        );
        return cargoItem !== undefined && cargoItem.units >= needed;
      });
    },
  },
  {
    key: "sell-surplus",
    label: "Sell Surplus Cargo",
    isComplete: (ctx) => {
      if (!ctx.ship) return false;
      const requiredSymbols = new Set(
        (ctx.contract.terms.deliver ?? []).map((g) => g.tradeSymbol),
      );
      return ctx.ship.cargo.inventory.every((item) =>
        requiredSymbols.has(item.symbol),
      );
    },
  },
  {
    key: "navigate-to-delivery",
    label: "Navigate to Delivery",
    isComplete: (ctx) => {
      if (!ctx.ship) return false;
      const deliverGood = ctx.contract.terms.deliver?.[0];
      if (!deliverGood) return false;
      return (
        ctx.ship.nav.status !== "IN_TRANSIT" &&
        ctx.ship.nav.waypointSymbol === deliverGood.destinationSymbol
      );
    },
  },
  {
    key: "deliver-goods",
    label: "Deliver Goods",
    isComplete: (ctx) => {
      const deliverGoods = ctx.contract.terms.deliver ?? [];
      return (
        deliverGoods.length > 0 &&
        deliverGoods.every((good) => good.unitsFulfilled >= good.unitsRequired)
      );
    },
  },
  {
    key: "fulfill-contract",
    label: "Fulfill Contract",
    isComplete: (ctx) => ctx.contract.fulfilled,
  },
];
