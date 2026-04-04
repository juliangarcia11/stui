import { Badge } from "@radix-ui/themes";
import type { FC } from "react";
import { numberWithCommas } from "~/utils";

export const CreditBadge: FC<{ credits?: string | number | bigint }> = ({
  credits,
}) => {
  if (credits === undefined) {
    return null;
  }

  return <Badge color="jade">¤ {numberWithCommas(credits.toString())}</Badge>;
};
