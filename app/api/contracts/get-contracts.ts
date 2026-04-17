import { Config } from "~/config";
import { getContracts as getContractsRequest, type Contract } from "../client";
import { buildAuth, standardizeListApiResponse } from "../utils";

type GetContractsParams = {
  token: string;
};

export async function getContracts({ token }: GetContractsParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;

  const response = await getContractsRequest({
    ...buildAuth(token),
  });

  return standardizeListApiResponse<Contract>(response);
}
