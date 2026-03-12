import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { useMemo, type FC } from "react";
import { DOCK_SHIP_ACTION } from "./DockingAlert";
import { ORBIT_SHIP_ACTION } from "./OrbitingAlert";
import type {
  ActionKeys,
  WaypointAction,
  WaypointRowActionsProps,
} from "../types";

const WAYPOINT_ACTIONS: Record<
  ActionKeys | `SEPARATOR_${string}`,
  WaypointAction
> = {
  OPEN_MARKET: { key: "OPEN_MARKET", label: "Open Market", disabled: true },
  OPEN_SHIPYARD: {
    key: "OPEN_SHIPYARD",
    label: "Open Shipyard",
    disabled: true,
  },
  SEPARATOR_1: { key: "SEPARATOR_1", label: "" },
  DOCK_SHIP: DOCK_SHIP_ACTION,
  ORBIT_SHIP: ORBIT_SHIP_ACTION,
  NAVIGATE_SHIP: {
    key: "NAVIGATE_SHIP",
    label: "Navigate Ship",
    disabled: true,
  },
  REFUEL_SHIP: { key: "REFUEL_SHIP", label: "Refuel Ship", disabled: true },
  DELIVER_CONTRACT: {
    key: "DELIVER_CONTRACT",
    label: "Deliver Contract",
    disabled: true,
  },
  SEPARATOR_2: { key: "SEPARATOR_2", label: "", disabled: true },
  JUMP_SYSTEM: { key: "JUMP_SYSTEM", label: "Jump to System", disabled: true },
  SURVEY_WAYPOINT: {
    key: "SURVEY_WAYPOINT",
    label: "Survey Waypoint",
    disabled: true,
  },
  MINE_WAYPOINT: {
    key: "MINE_WAYPOINT",
    label: "Mine Waypoint",
    disabled: true,
  },
};

/**
 * Actions menu for each waypoint row, showing possible interactions with the waypoint (e.g. navigate ship here, open market, etc.)
 * All actions are disabled since we haven't implemented any of the interactions yet. As we do, they will be enabled/disabled based
 * on the state of the waypoint and the player's ships/contracts.
 */
export const WaypointRowActions: FC<WaypointRowActionsProps> = ({
  waypoint,
}) => {
  const actionsToShow = useMemo(
    () =>
      Object.values(WAYPOINT_ACTIONS).map(
        ({ template: Template, ...action }) => {
          if (action.key.startsWith("SEPARATOR_")) {
            return <DropdownMenu.Separator key={action.key} />;
          }

          return (
            <DropdownMenu.Item
              key={action.key}
              shortcut={action.shortcut}
              disabled={
                typeof action.disabled === "function"
                  ? action.disabled({ waypoint })
                  : action.disabled
              }
            >
              {Template ? (
                <Template waypointSymbol={waypoint.symbol} />
              ) : (
                action.label
              )}
            </DropdownMenu.Item>
          );
        },
      ),
    [waypoint],
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button aria-label="waypoint actions" size="1">
          <DotsVerticalIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="1">{actionsToShow}</DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
