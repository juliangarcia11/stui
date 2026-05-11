import type { Agent, Contract, System, Waypoint } from "~/api/client";

export const SYSTEM_SYMBOL = "X1-TEST";
export const HQ_WAYPOINT = "X1-TEST-A1";
export const MARKET_WAYPOINT = "X1-TEST-B2";

export const agentFixture: Agent = {
  accountId: "test-account-id",
  symbol: "TESTAGENT",
  headquarters: HQ_WAYPOINT,
  credits: 100000,
  startingFaction: "COSMIC",
  shipCount: 0,
};

export const systemFixture: System = {
  symbol: SYSTEM_SYMBOL,
  sectorSymbol: "X1",
  type: "ORANGE_STAR",
  x: 0,
  y: 0,
  waypoints: [
    { symbol: HQ_WAYPOINT, type: "PLANET", x: 5, y: 10, orbitals: [] },
    { symbol: MARKET_WAYPOINT, type: "ORBITAL_STATION", x: 5, y: 10, orbitals: [] },
  ],
  factions: [{ symbol: "COSMIC" }],
};

export const waypointsFixture: Waypoint[] = [
  {
    symbol: HQ_WAYPOINT,
    type: "PLANET",
    systemSymbol: SYSTEM_SYMBOL,
    x: 5,
    y: 10,
    orbitals: [],
    faction: { symbol: "COSMIC" },
    traits: [{ symbol: "TEMPERATE", name: "Temperate", description: "A temperate world." }],
    isUnderConstruction: false,
  },
  {
    symbol: MARKET_WAYPOINT,
    type: "ORBITAL_STATION",
    systemSymbol: SYSTEM_SYMBOL,
    x: 5,
    y: 10,
    orbitals: [],
    faction: { symbol: "COSMIC" },
    traits: [{ symbol: "MARKETPLACE", name: "Marketplace", description: "A thriving marketplace." }],
    isUnderConstruction: false,
  },
];

export const contractsFixture: Contract[] = [];
