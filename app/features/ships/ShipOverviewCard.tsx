import { RocketIcon } from "@radix-ui/react-icons";
import type { FC } from "react";
import type { Ship } from "~/api/client";
import { OverviewDataCard, type OverviewDataItem } from "~/components";
import { capitalizeWords } from "~/utils";

const OVERVIEW_DATA: OverviewDataItem<Ship>[] = [
  {
    key: "symbol",
    label: "Symbol",
  },
  {
    key: "role",
    label: "Role",
    render: (ship) => ship.registration.role,
  },
  {
    key: "status",
    label: "Status",
    render: (ship) => capitalizeWords(ship.nav.status.replace(/_/g, " ")),
  },
  {
    key: "type",
    label: "Type",
    render: (ship) => ship.frame.name,
  },
];

export const ShipOverviewCard: FC<{ ship: Ship }> = ({ ship }) => (
  <OverviewDataCard
    title="Ship Overview"
    icon={<RocketIcon />}
    items={OVERVIEW_DATA}
    data={ship}
  />
);
