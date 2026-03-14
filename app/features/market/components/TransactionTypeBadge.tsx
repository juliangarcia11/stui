// File Purpose: UI Display only - dumb component
import { type BadgeProps, Badge } from "@radix-ui/themes";
import type { FC } from "react";
import type { MarketTransaction } from "~/api/client";
import { capitalizeWords } from "~/utils";

const TYPE_COLORS: Record<MarketTransaction["type"], BadgeProps["color"]> = {
  PURCHASE: "green",
  SELL: "blue",
};

/**
 * Badge component to display the type of a market transaction, with color coding for purchase vs sell
 */
export const TypeBadge: FC<{ type: MarketTransaction["type"] }> = ({
  type,
}) => {
  const color = TYPE_COLORS[type] || "gray";
  return <Badge color={color}>{capitalizeWords(type)}</Badge>;
};
