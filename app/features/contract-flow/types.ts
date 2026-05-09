import type { ReactNode } from "react";
import type { Agent, Contract, Ship, Waypoint } from "~/api/client";

export type StepState = "complete" | "active" | "upcoming";

export type ShipOption = {
  waypointSymbol: string;
  shipType: string;
  name: string;
  purchasePrice: number;
};

export type ShipCooldown = {
  remainingSeconds: number;
  expiration?: string;
};

export type ContractFlowContext = {
  contract: Contract;
  ship: Ship | null;
  agent: Agent;
  waypoints: Waypoint[];
  systemSymbol: string;
  shipOptions: ShipOption[];
  shipCooldown: ShipCooldown | null;
};

export type StepRenderProps = {
  ctx: ContractFlowContext;
  state: StepState;
  onRequestRefresh?: () => void;
};

export type ContractFlowStep = {
  key: string;
  label: string;
  isComplete: (ctx: ContractFlowContext) => boolean;
  renderSummary?: (ctx: ContractFlowContext) => string | undefined;
  renderContent: (props: StepRenderProps) => ReactNode;
};

export type ContractFlow = {
  steps: ContractFlowStep[];
  context: ContractFlowContext;
};
