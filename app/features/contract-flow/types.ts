import type { Agent, Contract, Ship, Waypoint } from "~/api/client";

export type ContractFlowContext = {
  contract: Contract;
  ship: Ship | null;
  agent: Agent;
  waypoints: Waypoint[];
  systemSymbol: string;
};

export type ContractFlowStep = {
  key: string;
  label: string;
  isComplete: (ctx: ContractFlowContext) => boolean;
};

export type ContractFlow = {
  steps: ContractFlowStep[];
  context: ContractFlowContext;
};
