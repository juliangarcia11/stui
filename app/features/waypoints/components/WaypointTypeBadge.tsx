import { Badge, type BadgeProps } from "@radix-ui/themes";
import type { FC } from "react";
import type { WaypointType } from "~/api/client";
import { capitalizeWords } from "~/utils";

const WaypointBadgeColor: Record<WaypointType, BadgeProps["color"]> = {
  PLANET: "blue",
  GAS_GIANT: "cyan",
  MOON: "gray",
  ORBITAL_STATION: "amber",
  JUMP_GATE: "purple",
  ASTEROID_FIELD: "orange",
  ASTEROID: "yellow",
  ENGINEERED_ASTEROID: "yellow",
  ASTEROID_BASE: "yellow",
  NEBULA: "crimson",
  DEBRIS_FIELD: "indigo",
  GRAVITY_WELL: "teal",
  ARTIFICIAL_GRAVITY_WELL: "teal",
  FUEL_STATION: "green",
};

type WaypointTypeBadgeProps = Omit<BadgeProps, "color"> & {
  type: WaypointType;
};

/**
 * A badge component that displays the type of a waypoint with a corresponding color.
 * Optionally accepts additional BadgeProps for further customization.
 */
export const WaypointTypeBadge: FC<WaypointTypeBadgeProps> = ({
  type,
  ...badgeProps
}) => (
  <Badge color={WaypointBadgeColor[type]} {...badgeProps}>
    {capitalizeWords(type.replace("_", " "))}
  </Badge>
);
