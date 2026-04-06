import { API } from "~/api";

export async function loadQuickstartData(token: string) {
  const agentInfo = await API.Agent.getAgentInfo(token);

  if (agentInfo.status === "error") {
    throw new Error(`Failed to fetch agent info: ${agentInfo.message}`);
  }

  return {
    agentInfo: agentInfo.data,
  };
}
