import { Config } from "~/config";
import type { ApiResponse } from "~/types";
import {
  getContracts,
  getMyAgent,
  getMyShips,
  type Agent,
  type Contract,
  type GetContractsResponse,
  type GetMyShipsResponse,
  type Ship,
} from "../client";
import {
  buildAuth,
  standardizeListApiResponse,
  standardizeApiResponse,
  wrapSuccess,
} from "../utils";

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
    getMyAgent(buildAuth(token)).then(standardizeApiResponse),
    getContracts(buildAuth(token)).then(standardizeListApiResponse),
    getMyShips(buildAuth(token)).then(standardizeListApiResponse),
  ];

  // Make parallel requests & parse errors
  const responses = await Promise.all(requests);

  // Validate responses
  const agentResult = responses[0] as ApiResponse<Agent>;
  if (agentResult.status === "error") return agentResult;
  const contractsResult = responses[1] as ApiResponse<GetContractsResponse>;
  if (contractsResult.status === "error") return contractsResult;
  const shipsResult = responses[2] as ApiResponse<GetMyShipsResponse>;
  if (shipsResult.status === "error") return shipsResult;

  // Prepare resulting data
  return wrapSuccess({
    agent: agentResult.data,
    contracts: contractsResult.data.data, // meta is useless here
    ships: shipsResult.data.data, // meta is useless here
  });
}
