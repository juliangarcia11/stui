import { Text } from "@radix-ui/themes";
import { numberWithCommas } from "~/utils/numbers";
import { AcceptContractStep } from "./steps/AcceptContractStep";
import { AgentOverviewStep } from "./steps/AgentOverviewStep";
import { StartingLocationStep } from "./steps/StartingLocationStep";
import type { ContractFlowStep, StepRenderProps } from "./types";

const ASTEROID_TYPES = ["ASTEROID", "ENGINEERED_ASTEROID"] as const;

const placeholder = (_props: StepRenderProps) => (
  <Text size="1" color="gray">
    Step content coming soon
  </Text>
);

export const CONTRACT_FLOW_STEPS: ContractFlowStep[] = [
  {
    key: "agent-overview",
    label: "Agent Overview",
    isComplete: (ctx) => Boolean(ctx.agent.symbol),
    renderSummary: (ctx) =>
      `${ctx.agent.symbol} · ${numberWithCommas(Number(ctx.agent.credits))} ¢`,
    renderContent: (props) => <AgentOverviewStep {...props} />,
  },
  {
    key: "starting-location",
    label: "Starting Location",
    isComplete: (ctx) => ctx.waypoints.length > 0,
    renderSummary: (ctx) => {
      const hq = ctx.waypoints.find((w) => w.symbol === ctx.agent.headquarters);
      return `${ctx.systemSymbol} · ${hq?.type ?? ""}`;
    },
    renderContent: (props) => <StartingLocationStep {...props} />,
  },
  {
    key: "accept-contract",
    label: "Accept Contract",
    isComplete: (ctx) => ctx.contract.accepted,
    renderSummary: (ctx) => {
      const deliver = ctx.contract.terms.deliver?.[0];
      return deliver
        ? `${ctx.contract.factionSymbol} · ${deliver.tradeSymbol} ×${deliver.unitsRequired}`
        : ctx.contract.factionSymbol;
    },
    renderContent: (props) => <AcceptContractStep {...props} />,
  },
  {
    key: "purchase-ship",
    label: "Purchase Ship",
    isComplete: (ctx) => ctx.ship !== null,
    renderContent: placeholder,
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
      return (
        current !== undefined &&
        ASTEROID_TYPES.includes(current.type as (typeof ASTEROID_TYPES)[number])
      );
    },
    renderContent: placeholder,
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
    renderContent: placeholder,
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
    renderContent: placeholder,
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
    renderContent: placeholder,
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
    renderContent: placeholder,
  },
  {
    key: "fulfill-contract",
    label: "Fulfill Contract",
    isComplete: (ctx) => ctx.contract.fulfilled,
    renderContent: placeholder,
  },
];
