import { Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router";
import { numberWithCommas } from "~/utils/numbers";
import type { ContractFlowContext } from "../types";

type Props = { ctx: ContractFlowContext };

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <Flex justify="between" gap="2">
      <Text size="1" color="gray">
        {label}
      </Text>
      <Text size="1" weight="medium" className="font-mono">
        {value}
      </Text>
    </Flex>
  );
}

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
