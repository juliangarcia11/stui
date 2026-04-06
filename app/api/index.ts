import { AgentApi } from "./agent";
import { ContractsApi } from "./contracts";
import { FleetApi } from "./fleet";
import { GlobalApi } from "./global";
import { SystemsApi } from "./systems";

export * from "./utils";

export const API = {
  Agent: AgentApi,
  Contracts: ContractsApi,
  Data: {},
  Factions: {},
  Fleet: FleetApi,
  Global: GlobalApi,
  Systems: SystemsApi,
};
