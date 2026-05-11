import { agentFixture, SYSTEM_SYMBOL } from "./waypoints";

// Waypoints extended with an asteroid for step 5 / step 8 fixture trick
const waypoints = [
  {
    symbol: "X1-TEST-A1",
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
    symbol: "X1-TEST-B2",
    type: "ORBITAL_STATION",
    systemSymbol: SYSTEM_SYMBOL,
    x: 5,
    y: 10,
    orbitals: [],
    faction: { symbol: "COSMIC" },
    traits: [{ symbol: "MARKETPLACE", name: "Marketplace", description: "A thriving marketplace." }],
    isUnderConstruction: false,
  },
  {
    symbol: "X1-TEST-D4",
    type: "ASTEROID",
    systemSymbol: SYSTEM_SYMBOL,
    x: 20,
    y: -5,
    orbitals: [],
    traits: [],
    isUnderConstruction: false,
  },
];

export const CONTRACT_ID = "contract-test-001";
export const TRADE_SYMBOL = "IRON_ORE";
export const UNITS_REQUIRED = 60;
export const ASTEROID_SYMBOL = "X1-TEST-D4";
export const SHIP_SYMBOL = "TESTAGENT-1";

const baseContract = {
  id: CONTRACT_ID,
  factionSymbol: "COSMIC",
  type: "PROCUREMENT",
  terms: {
    deadline: "2026-06-01T00:00:00.000Z",
    payment: { onAccepted: 5000, onFulfilled: 40000 },
    deliver: [
      {
        tradeSymbol: TRADE_SYMBOL,
        destinationSymbol: "X1-TEST-A1",
        unitsRequired: UNITS_REQUIRED,
        unitsFulfilled: 0,
      },
    ],
  },
  accepted: false,
  fulfilled: false,
  expiration: "2026-06-01T00:00:00.000Z",
  deadlineToAccept: "2026-06-01T00:00:00.000Z",
};

// Minimal mining ship shape — only fields accessed by steps and predicates
const makeMiningShip = (waypointSymbol: string) => ({
  symbol: SHIP_SYMBOL,
  registration: { name: "Test Miner", factionSymbol: "COSMIC", role: "EXCAVATOR" },
  nav: {
    systemSymbol: SYSTEM_SYMBOL,
    waypointSymbol,
    status: "DOCKED",
    flightMode: "CRUISE",
    route: {
      destination: { symbol: waypointSymbol, type: "ASTEROID", systemSymbol: SYSTEM_SYMBOL, x: 20, y: -5 },
      origin: { symbol: "X1-TEST-B2", type: "ORBITAL_STATION", systemSymbol: SYSTEM_SYMBOL, x: 5, y: 10 },
      departureTime: "2026-05-09T00:00:00.000Z",
      arrival: "2026-05-09T00:10:00.000Z",
    },
  },
  cargo: { units: 0, capacity: 60, inventory: [] },
  mounts: [
    {
      symbol: "MOUNT_MINING_LASER_I",
      name: "Mining Laser I",
      description: "A basic mining laser.",
      strength: 10,
      deposits: [],
      requirements: { power: 1, crew: 0, slots: 1 },
    },
  ],
});

const baseCtx = {
  agent: agentFixture,
  systemSymbol: SYSTEM_SYMBOL,
  waypoints,
  ship: null,
  shipOptions: [] as unknown[],
  shipCooldown: null,
  fleetSize: 0,
};

// Step 3 active — contract not yet accepted
export const preAcceptCtx = {
  ...baseCtx,
  contract: baseContract,
};

// Step 4 active — contract accepted, no ship, ship options available
export const purchaseShipCtx = {
  ...baseCtx,
  contract: { ...baseContract, accepted: true },
  shipOptions: [
    {
      waypointSymbol: "X1-TEST-C3",
      shipType: "SHIP_MINING_DRONE",
      name: "Mining Drone",
      purchasePrice: 20000,
    },
  ],
};

// Step 6 active — ship at asteroid with empty cargo (step 5 done, step 6 not yet)
export const atAsteroidCtx = {
  ...baseCtx,
  contract: { ...baseContract, accepted: true },
  ship: makeMiningShip(ASTEROID_SYMBOL),
  fleetSize: 1,
};

// Step 10 active — all goods delivered; destinationSymbol = asteroid so steps 5+8 both satisfy
const fulfilledDelivery = {
  tradeSymbol: TRADE_SYMBOL,
  destinationSymbol: ASTEROID_SYMBOL,
  unitsRequired: UNITS_REQUIRED,
  unitsFulfilled: UNITS_REQUIRED,
};

export const fulfillCtx = {
  ...baseCtx,
  contract: {
    ...baseContract,
    accepted: true,
    terms: { ...baseContract.terms, deliver: [fulfilledDelivery] },
  },
  ship: makeMiningShip(ASTEROID_SYMBOL),
  fleetSize: 1,
};

// All steps complete — triggers CompletionScreen
export const completedCtx = {
  ...fulfillCtx,
  contract: { ...fulfillCtx.contract, fulfilled: true },
  agent: { ...agentFixture, credits: 145000 },
};
