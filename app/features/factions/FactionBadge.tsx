import { Badge, type BadgeProps } from "@radix-ui/themes";
import type { FactionSymbol } from "~/api/client";
import { capitalizeWords } from "~/utils";

// Mapping of faction symbols to their corresponding badge colors
export const FACTION_BADGE_COLORS: Record<FactionSymbol, BadgeProps["color"]> =
  {
    COSMIC: "purple",
    VOID: "gray",
    GALACTIC: "blue",
    QUANTUM: "cyan",
    DOMINION: "red",
    ASTRO: "green",
    CORSAIRS: "orange",
    OBSIDIAN: "plum",
    AEGIS: "teal",
    UNITED: "indigo",
    SOLITARY: "yellow",
    COBALT: "sky",
    OMEGA: "mint",
    ECHO: "lime",
    LORDS: "grass",
    CULT: "crimson",
    ANCIENTS: "jade",
    SHADOW: "iris",
    ETHEREAL: "sky",
  };

/**
 * Component for displaying a badge with a faction name.
 * The badge color is determined by the faction symbol using the FACTION_BADGE_COLORS mapping.
 * If the not provided a faction trait, this component will render null.
 */
export const FactionBadge: React.FC<{
  factionSymbol?: FactionSymbol;
}> = ({ factionSymbol }) => {
  if (!factionSymbol) return null;
  const color = FACTION_BADGE_COLORS[factionSymbol];

  return <Badge color={color}>{capitalizeWords(factionSymbol)}</Badge>;
};
