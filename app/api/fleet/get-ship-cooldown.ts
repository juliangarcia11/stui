import { Config } from "~/config";
import {
  getShipCooldown as getShipCooldownRequest,
  type Cooldown,
} from "../client";
import { buildAuth, extractApiErr, wrapErr, wrapSuccess } from "../utils";

type GetShipCooldownParams = {
  token: string;
  shipSymbol: string;
};

export type ShipCooldownData = {
  remainingSeconds: number;
  expiration?: string;
};

export async function getShipCooldown({ token, shipSymbol }: GetShipCooldownParams) {
  if (!token.trim().length) return Config.Errors.MissingToken;
  if (!shipSymbol.trim().length) return Config.Errors.MissingShip;

  const response = await getShipCooldownRequest({
    ...buildAuth(token),
    path: { shipSymbol },
  });

  if (response.error) return wrapErr(extractApiErr(response.error));
  // 204 = no active cooldown; the 204 variant types response.data as unknown
  const cooldown = (response.data as { data?: Cooldown } | undefined)?.data;
  if (!cooldown) return wrapSuccess<ShipCooldownData | null>(null);

  return wrapSuccess<ShipCooldownData | null>({
    remainingSeconds: cooldown.remainingSeconds,
    expiration: cooldown.expiration ? String(cooldown.expiration) : undefined,
  });
}
