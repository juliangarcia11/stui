import { Config } from "~/config";
import { orbitShip as orbitShipRequest } from "./client";
import type { OrbitShipResponses } from "./client";
import { buildAuth, standardizeApiResponse } from "./utils";

type OrbitShipParams = {
  token: string;
  shipSymbol: string;
};

type OrbitShipResponse = OrbitShipResponses["200"]["data"];

export async function orbitShip({ token, shipSymbol }: OrbitShipParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!shipSymbol.trim().length) return Config.Errors.MissingShip;

  const response = await orbitShipRequest({
    ...buildAuth(token),
    path: {
      shipSymbol,
    },
  });

  return standardizeApiResponse<OrbitShipResponse>(response);
}
