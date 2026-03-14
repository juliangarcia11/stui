import {
  Badge,
  Button,
  Flex,
  type BadgeProps,
  type ButtonProps,
} from "@radix-ui/themes";
import type { FC } from "react";
import { NavLink, type NavLinkProps } from "react-router";

type WaypointPoiButtonProps = ButtonProps & {
  color?: BadgeProps["color"];
  badge?: string;
  text?: string;
};

/**
 * Button component for displaying text & a badge within a Button, sharing color variants between the Button and Badge.
 */
export const WaypointPoiButton: FC<WaypointPoiButtonProps> = ({
  color,
  badge,
  text,
}) => (
  <Button color={color} variant="outline" size="1">
    <Flex align="center" gap="2">
      {text} {!!badge?.length && <Badge color={color}>{badge}</Badge>}
    </Flex>
  </Button>
);

type WaypointPoiNavButtonProps = WaypointPoiButtonProps & {
  to: NavLinkProps["to"];
};

/**
 * Navigation button for points of interest that takes the user to a different route (e.g. market, shipyard, etc.) when clicked.
 */
export const WaypointPoiNavButton: FC<WaypointPoiNavButtonProps> = ({
  to,
  ...props
}) => (
  <NavLink to={to}>
    {(inner) => (
      <WaypointPoiButton
        loading={inner.isPending || inner.isTransitioning}
        {...props}
      />
    )}
  </NavLink>
);
