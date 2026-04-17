import { Config } from "~/config";
import { getMyShips, type Ship } from "../client";
import { buildAuth, standardizeListApiResponse } from "../utils";

type GetShipsParams = {
  token: string;
};

export async function getShips({ token }: GetShipsParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;

  const response = await getMyShips({
    ...buildAuth(token),
  });

  return standardizeListApiResponse<Ship>(response);
}
