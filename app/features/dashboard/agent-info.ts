import {
  getContracts,
  getMyAgent,
  getMyShips,
  type Agent,
  type Contract,
  type Ship,
} from "~/client";
import { Config } from "~/config";
import type { ApiResponse } from "~/types";
import { buildAuth, extractApiErr, wrapErr, wrapSuccess } from "~/utils";

export type AgentInfo = {
  agent: Agent;
  contracts: Contract[];
  ships: Ship[];
};

type AgentInfoResponse = ApiResponse<AgentInfo>;

/**
 * Get Agent, Contracts, and Ships in a parallel request
 */
export async function getAgentInfo(token: string): Promise<AgentInfoResponse> {
  // Validate user input
  if (!token.trim().length) {
    return Config.Errors.MissingToken;
  }

  // Prepare all requests for parallelization
  const requests = [
    getMyAgent(buildAuth(token)),
    getContracts(buildAuth(token)),
    getMyShips(buildAuth(token)),
  ];

  // Make parallel requests & parse errors
  const results = await Promise.all(
    requests.map((request) =>
      request.then((response) => {
        if (response.error) return wrapErr(extractApiErr(response.error));
        if (!response.data) return Config.Errors.MissingData;

        return wrapSuccess(response.data.data);
      }),
    ),
  );

  // Validate responses
  const agentResult = results[0] as ApiResponse<Agent>;
  if (agentResult.status === "error") return agentResult;
  const contractsResult = results[1] as ApiResponse<Contract[]>;
  if (contractsResult.status === "error") return contractsResult;
  const shipsResult = results[2] as ApiResponse<Ship[]>;
  if (shipsResult.status === "error") return shipsResult;

  // Prepare resulting data
  return wrapSuccess({
    agent: agentResult.data,
    contracts: contractsResult.data,
    ships: shipsResult.data,
  });
}
