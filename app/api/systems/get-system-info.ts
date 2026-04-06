import { Config } from "~/config";
import { getSystem, type System } from "../client";
import { buildAuth, standardizeApiResponse } from "../utils";

type GetSystemInfoParams = {
  token: string;
  systemSymbol: string;
};

export async function getSystemInfo({
  token,
  systemSymbol,
}: GetSystemInfoParams) {
  // Validate user input
  if (!token.trim().length) {
    return Config.Errors.MissingToken;
  }

  const response = await getSystem({
    ...buildAuth(token),
    path: {
      systemSymbol,
    },
  });

  return standardizeApiResponse<System>(response);
}
