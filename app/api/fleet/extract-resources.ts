import { Config } from "~/config";
import {
  extractResources as extractResourcesRequest,
  type ExtractResourcesResponses,
} from "../client";
import { Cache } from "../cache";
import { buildAuth, standardizeApiResponse } from "../utils";

type ExtractResourcesResponse = ExtractResourcesResponses["201"]["data"];

type ExtractResourcesParams = {
  token: string;
  shipSymbol: string;
};

export async function extractResources({
  token,
  shipSymbol,
}: ExtractResourcesParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!shipSymbol.trim().length) return Config.Errors.MissingShip;

  const response = await extractResourcesRequest({
    ...buildAuth(token),
    path: { shipSymbol },
  });

  if (response.response.ok) {
    Cache.Invalidate.shipCache(shipSymbol);
  }

  return standardizeApiResponse<ExtractResourcesResponse>(response);
}
