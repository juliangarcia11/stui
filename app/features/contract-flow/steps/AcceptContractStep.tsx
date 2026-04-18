import { Badge, Flex, Text } from "@radix-ui/themes";
import { ContractAcceptanceButton } from "~/features/contracts/ContractAcceptanceButton";
import { numberWithCommas } from "~/utils/numbers";
import { DataRow } from "../components/DataRow";
import type { ContractFlowContext } from "../types";

type Props = { ctx: ContractFlowContext };

export function AcceptContractStep({ ctx }: Props) {
  const { contract } = ctx;

  if (contract.accepted) {
    return (
      <Text size="1" color="gray">
        Contract accepted.
      </Text>
    );
  }

  const deliver = contract.terms.deliver?.[0];

  return (
    <Flex direction="column" gap="2">
      <div className="rounded border border-(--gray-4) px-2 py-1.5 flex flex-col gap-1">
        <DataRow label="Faction" value={contract.factionSymbol} />
        {deliver && (
          <>
            <DataRow label="Deliver" value={deliver.tradeSymbol} />
            <DataRow label="Units" value={String(deliver.unitsRequired)} />
            <DataRow label="Destination" value={deliver.destinationSymbol} />
          </>
        )}
        <DataRow
          label="On Accept"
          value={`${numberWithCommas(Number(contract.terms.payment.onAccepted))} ¢`}
        />
        <DataRow
          label="On Fulfill"
          value={`${numberWithCommas(Number(contract.terms.payment.onFulfilled))} ¢`}
        />
        {contract.deadlineToAccept && (
          <Flex justify="between" gap="2">
            <Text size="1" color="gray">
              Expires
            </Text>
            <Badge color="amber" size="1">
              {new Date(contract.deadlineToAccept).toLocaleDateString()}
            </Badge>
          </Flex>
        )}
      </div>
      <ContractAcceptanceButton contractId={contract.id} />
    </Flex>
  );
}
