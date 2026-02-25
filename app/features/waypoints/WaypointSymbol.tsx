import { Badge, Text, Tooltip } from "@radix-ui/themes";
import type { FC } from "react";
import { removeSystemPrefix } from "./utils";

type WaypointSymbolProps = {
  headquarters: string;
  waypointSymbol: string;
};

/**
 * Displays the waypoint symbol, without the system prefix, and a badge if it's the agent's headquarters
 * Note: There is no container element here, so it can be further customized by the parent component (e.g. adding a tooltip or additional styling)
 */
export const WaypointSymbol: FC<WaypointSymbolProps> = ({
  headquarters,
  waypointSymbol,
}) => {
  return (
    <>
      {removeSystemPrefix(waypointSymbol)}{" "}
      <HeadquartersIcon
        headquarters={headquarters}
        waypointSymbol={waypointSymbol}
      />
    </>
  );
};

/**
 * Displays a home icon if the waypoint is the agent's headquarters
 */
const HeadquartersIcon: FC<WaypointSymbolProps> = ({
  headquarters,
  waypointSymbol,
}) => {
  const isHeadquarters = headquarters === waypointSymbol;
  if (!isHeadquarters) return null;

  return (
    <Tooltip content="Agent headquarters">
      <Badge my="auto">HEADQUARTERS</Badge>
    </Tooltip>
  );
};
