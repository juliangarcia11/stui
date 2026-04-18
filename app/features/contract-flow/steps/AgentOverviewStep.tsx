import { Flex } from "@radix-ui/themes";
import { Link } from "react-router";
import { numberWithCommas } from "~/utils/numbers";
import { DataRow } from "../components/DataRow";
import type { ContractFlowContext } from "../types";

type Props = { ctx: ContractFlowContext };

export function AgentOverviewStep({ ctx }: Props) {
  const { agent } = ctx;
  return (
    <Flex direction="column" gap="2">
      <div className="rounded border border-(--gray-4) px-2 py-1.5 flex flex-col gap-1">
        <DataRow label="Callsign" value={agent.symbol} />
        <DataRow
          label="Credits"
          value={`${numberWithCommas(Number(agent.credits))} ¢`}
        />
        <DataRow label="Faction" value={agent.startingFaction} />
        <DataRow label="HQ" value={agent.headquarters} />
      </div>
      <Link to="/" className="text-xs text-(--accent-11) hover:underline">
        View agent dashboard →
      </Link>
    </Flex>
  );
}
