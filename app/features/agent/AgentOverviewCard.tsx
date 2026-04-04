import { PersonIcon } from "@radix-ui/react-icons";
import type { FC } from "react";
import type { Agent, FactionSymbol } from "~/api/client";
import {
  CreditBadge,
  OverviewDataCard,
  type OverviewDataItem,
} from "~/components";
import { FactionBadge } from "~/features/factions";

const AGENT_OVERVIEW_INFO =
  "You are an Agent — an independent operator with a credit balance, a headquarters, and a growing fleet.";

const OVERVIEW_DATA: OverviewDataItem<Agent>[] = [
  {
    key: "symbol",
    label: "Callsign",
  },
  {
    key: "credits",
    label: "Credits",
    render: (agent) => <CreditBadge credits={agent.credits} />,
  },
  {
    key: "startingFaction",
    label: "Faction",
    render: (agent) => (
      <FactionBadge factionSymbol={agent.startingFaction as FactionSymbol} />
    ),
  },
  {
    key: "headquarters",
    label: "HQ",
  },
];

export const AgentOverviewCard: FC<{ agent: Agent }> = ({ agent }) => (
  <OverviewDataCard
    title="Agent Overview"
    icon={<PersonIcon />}
    items={OVERVIEW_DATA}
    data={agent}
  />
);
