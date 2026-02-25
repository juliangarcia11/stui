import { getSystem, type System } from "~/client";
import { Config } from "~/config";
import type { ApiResponse } from "~/types";
import { buildAuth, extractApiErr, wrapErr, wrapSuccess } from "~/utils";

type GetSystemInfoParams = {
  token: string;
  systemSymbol: string;
};

type GetSystemInfoResponse = ApiResponse<System>;

export async function getSystemInfo({
  token,
  systemSymbol,
}: GetSystemInfoParams): Promise<GetSystemInfoResponse> {
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

  if (response.error) return wrapErr(extractApiErr(response.error));
  if (!response.data) return Config.Errors.MissingData;

  return wrapSuccess(response.data.data);
}
