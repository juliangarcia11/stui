import { AgentApi } from "./agent";
import { ContractsApi } from "./contracts";
import { FleetApi } from "./fleet";
import { GlobalApi } from "./global";
import { SystemsApi } from "./systems";

// only exporting what is needed outside of this module to keep the API surface small
export { extractSchemaDescriptions, wrapErr } from "./utils";

export const API = {
  Agent: AgentApi,
  Contracts: ContractsApi,
  Data: {},
  Factions: {},
  Fleet: FleetApi,
  Global: GlobalApi,
  Systems: SystemsApi,
};
