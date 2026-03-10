import { Config } from "~/config";
import { dockShip as dockShipRequest, type DockShipResponses } from "./client";
import { buildAuth, standardizeApiResponse } from "./utils";

type DockShipParams = {
  token: string;
  shipSymbol: string;
};

type DockShipResponse = DockShipResponses["200"]["data"];

export async function dockShip({ token, shipSymbol }: DockShipParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!shipSymbol.trim().length) return Config.Errors.MissingShip;

  const response = await dockShipRequest({
    ...buildAuth(token),
    path: {
      shipSymbol,
    },
  });

  return standardizeApiResponse<DockShipResponse>(response);
}
