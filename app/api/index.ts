import { AgentApi } from "./agent";
import { ContractsApi } from "./contracts";
import { SystemsApi } from "./systems";

// TODO: migrate to `Object Literal Pattern` for better code organization and maintainability.
export * from "./agent/agent-login";
export * from "./agent/agent-registration";
export * from "./agent/get-agent";
export * from "./agent/get-agent-info";
export * from "./dock-ship";
export * from "./get-api-status";
export * from "./orbit-ship";
export * from "./systems/get-market";
export * from "./systems/get-system-info";
export * from "./systems/get-waypoints-list";
export * from "./utils";

export const API = {
  Agent: AgentApi,
  Contracts: ContractsApi,
  Systems: SystemsApi,
};
