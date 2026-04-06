import { AgentApi } from "./agent";
import { ContractsApi } from "./contracts";

// TODO: migrate to `Object Literal Pattern` for better code organization and maintainability.
export * from "./agent/agent-login";
export * from "./agent/agent-registration";
export * from "./agent/get-agent";
export * from "./agent/get-agent-info";
export * from "./dock-ship";
export * from "./get-api-status";
export * from "./get-market";
export * from "./get-system-info";
export * from "./get-waypoints-list";
export * from "./orbit-ship";
export * from "./utils";

export const API = {
  Agent: AgentApi,
  Contracts: ContractsApi,
};
