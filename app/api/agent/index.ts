import { loginAgent } from "./agent-login";
import { registerAgent } from "./agent-registration";
import { getAgent } from "./get-agent";
import { getAgentInfo } from "./get-agent-info";

/**
 * Agent-related API functions.
 * Each function corresponds to a specific agent-related API endpoint and handles the necessary request and response processing.
 */
const BaseAgentApi = {
  getAgent,
  loginAgent,
  registerAgent,
};

/**
 * Custom API functions that group multiple API functions into single, cohesive operations.
 */
const CustomAgentApi = {
  getAgentInfo,
};

/**
 * Unified Agent API combining base & custom functions for agent operations.
 */
export const AgentApi = {
  ...BaseAgentApi,
  ...CustomAgentApi,
};
