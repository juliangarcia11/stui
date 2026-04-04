import { DiscIcon } from "@radix-ui/react-icons";
import type { FC } from "react";
import type { Waypoint } from "~/api/client";
import { OverviewDataCard, type OverviewDataItem } from "~/components";
import { removeSystemPrefix } from "../utils";
import { WaypointTypeBadge } from "./WaypointTypeBadge";

// TODO: use this to make a "Starting Location" card for the Quickstart feature

const WAYPOINT_OVERVIEW_INFO =
  "Your HQ sits inside a system. Waypoints are specific locations within a system — planets, stations, asteroids, and jump gates.";

const OVERVIEW_DATA: OverviewDataItem<Waypoint>[] = [
  { key: "systemSymbol", label: "System" },
  {
    key: "symbol",
    label: "Waypoint",
    render: (_, waypoint) => removeSystemPrefix(waypoint.symbol),
  },
  {
    key: "type",
    label: "Type",
    render: (_, waypoint) => <WaypointTypeBadge type={waypoint.type} />,
  },
  {
    key: "x",
    label: "Coords",
    render: (_, waypoint) => `(${waypoint.x}, ${waypoint.y})`,
  },
];

export const WaypointOverviewCard: FC<{
  title?: string;
  waypoint: Waypoint;
}> = ({ title = "Waypoint Overview", waypoint }) => (
  <OverviewDataCard
    title={title}
    icon={<DiscIcon />}
    items={OVERVIEW_DATA}
    data={waypoint}
  />
);
