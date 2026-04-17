import { Config } from "~/config";
import {
  sellCargo as sellCargoRequest,
  type SellCargoResponses,
  type TradeSymbol,
} from "../client";
import { Cache } from "../cache";
import { buildAuth, standardizeApiResponse } from "../utils";

type SellCargoResponse = SellCargoResponses["201"]["data"];

type SellCargoParams = {
  token: string;
  shipSymbol: string;
  symbol: TradeSymbol;
  units: number;
};

export async function sellCargo({
  token,
  shipSymbol,
  symbol,
  units,
}: SellCargoParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!shipSymbol.trim().length) return Config.Errors.MissingShip;

  const response = await sellCargoRequest({
    ...buildAuth(token),
    path: { shipSymbol },
    body: { symbol, units },
  });

  if (response.response.ok) {
    Cache.Invalidate.shipCache(shipSymbol);
    Cache.Invalidate.agent();
    Cache.Invalidate.allAgents();
  }

  return standardizeApiResponse<SellCargoResponse>(response);
}
