import { Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router";
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

export function StartingLocationStep({ ctx }: Props) {
  const { agent, systemSymbol, waypoints } = ctx;
  const hqWaypoint = waypoints.find((w) => w.symbol === agent.headquarters);

  return (
    <Flex direction="column" gap="2">
      <div className="rounded border border-(--gray-4) px-2 py-1.5 flex flex-col gap-1">
        <DataRow label="System" value={systemSymbol} />
        <DataRow label="Waypoint" value={agent.headquarters} />
        {hqWaypoint && (
          <>
            <DataRow label="Type" value={hqWaypoint.type} />
            <DataRow
              label="Coords"
              value={`${hqWaypoint.x}, ${hqWaypoint.y}`}
            />
          </>
        )}
      </div>
      <Text size="1" color="gray" className="font-mono leading-tight">
        {systemSymbol}
        <br />
        {"  └─ "}
        {agent.headquarters}
        {hqWaypoint ? ` (${hqWaypoint.type})` : ""}
      </Text>
      <Link
        to="/waypoints"
        className="text-xs text-(--accent-11) hover:underline"
      >
        View waypoints →
      </Link>
    </Flex>
  );
}
