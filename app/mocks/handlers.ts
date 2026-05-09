import { http, HttpResponse } from "msw";
import type { RequestHandler } from "msw";
import { marketFixture } from "./fixtures/market";
import {
  agentFixture,
  contractsFixture,
  systemFixture,
  waypointsFixture,
} from "./fixtures/waypoints";

const BASE = "https://api.spacetraders.io/v2";

export const handlers: RequestHandler[] = [
  http.get(`${BASE}/my/agent`, () =>
    HttpResponse.json({ data: agentFixture }),
  ),
  http.get(`${BASE}/my/contracts`, () =>
    HttpResponse.json({
      data: contractsFixture,
      meta: { total: 0, page: 1, limit: 20 },
    }),
  ),
  http.get(`${BASE}/my/ships`, () =>
    HttpResponse.json({ data: [], meta: { total: 0, page: 1, limit: 20 } }),
  ),
  http.get(`${BASE}/systems/:systemSymbol`, () =>
    HttpResponse.json({ data: systemFixture }),
  ),
  http.get(`${BASE}/systems/:systemSymbol/waypoints`, () =>
    HttpResponse.json({
      data: waypointsFixture,
      meta: { total: 2, page: 1, limit: 10 },
    }),
  ),
  http.get(
    `${BASE}/systems/:systemSymbol/waypoints/:waypointSymbol/market`,
    () => HttpResponse.json({ data: marketFixture }),
  ),
];
