import { Badge, Button, Flex, type BadgeProps } from "@radix-ui/themes";
import type { FC } from "react";

type WaypointPoiButtonProps = {
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
