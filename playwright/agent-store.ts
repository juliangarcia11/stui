import * as fs from "fs";
import * as path from "path";

const AGENT_FILE = path.join(import.meta.dirname, ".auth", "agent.json");
const REGISTER_URL = "https://api.spacetraders.io/v2/register";
const STATUS_URL = "https://api.spacetraders.io/v2/";

type StoredAgent = {
  symbol: string;
  token: string;
  resetDate: string;
};

async function fetchResetDate(): Promise<string> {
  const res = await fetch(STATUS_URL);
  if (!res.ok) throw new Error(`Failed to fetch API status: ${res.status}`);
  const json = await res.json();
  return json.resetDate as string;
}

function buildSymbol(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `JELLTEST${yy}${mm}${dd}`;
}

async function register(accountToken: string, resetDate: string): Promise<StoredAgent> {
  const symbol = buildSymbol();
  console.log(`[agent-store] Registering new test agent: ${symbol}`);

  const res = await fetch(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accountToken}`,
    },
    body: JSON.stringify({ symbol, faction: "COSMIC" }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Registration failed: ${JSON.stringify(json.error ?? json)}`);
  }

  return { symbol: json.data.agent.symbol, token: json.data.token, resetDate };
}

function load(): StoredAgent | null {
  if (!fs.existsSync(AGENT_FILE)) return null;
  return JSON.parse(fs.readFileSync(AGENT_FILE, "utf-8")) as StoredAgent;
}

function save(agent: StoredAgent): void {
  fs.mkdirSync(path.dirname(AGENT_FILE), { recursive: true });
  fs.writeFileSync(AGENT_FILE, JSON.stringify(agent, null, 2));
}

export async function getOrRegisterAgent(accountToken: string): Promise<StoredAgent> {
  const resetDate = await fetchResetDate();
  const stored = load();

  if (stored?.resetDate === resetDate) {
    console.log(`[agent-store] Reusing agent: ${stored.symbol}`);
    return stored;
  }

  if (stored) {
    console.log(`[agent-store] Server reset detected (${stored.resetDate} → ${resetDate}), re-registering.`);
  }

  const agent = await register(accountToken, resetDate);
  save(agent);
  return agent;
}
