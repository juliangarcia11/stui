import { Button, Flex, Link, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { numberWithCommas } from "~/utils/numbers";
import { DataRow } from "./components/DataRow";
import type { ContractFlowContext } from "./types";

const AUTO_DISMISS_SECONDS = 5;

type CompletionScreenProps = {
  context: ContractFlowContext;
  onDismiss: () => void;
};

export function CompletionScreen({ context, onDismiss }: CompletionScreenProps) {
  const { agent, contract, fleetSize } = context;
  const [remaining, setRemaining] = useState(AUTO_DISMISS_SECONDS);

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((s) => {
        if (s <= 1) {
          clearInterval(id);
          onDismiss();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [onDismiss]);

  const creditsEarned = Number(contract.terms.payment.onFulfilled);

  return (
    <Flex direction="column" gap="4" p="4" className="flex-1">
      <Flex direction="column" gap="1">
        <Text size="3" weight="bold">
          Contract complete!
        </Text>
        <Text size="1" color="gray">
          Your first contract has been fulfilled.
        </Text>
      </Flex>

      <div className="rounded border border-(--gray-4) px-2 py-1.5 flex flex-col gap-1">
        <DataRow
          label="Earned"
          value={`+${numberWithCommas(creditsEarned)} ¢`}
        />
        <DataRow
          label="Total credits"
          value={`${numberWithCommas(Number(agent.credits))} ¢`}
        />
        <DataRow label="Fleet size" value={String(fleetSize)} />
      </div>

      <Flex direction="column" gap="2">
        <Text size="1" color="gray" weight="medium">
          Explore
        </Text>
        <Link href="/waypoints" size="1">
          Waypoints
        </Link>
      </Flex>

      <Flex direction="column" gap="2" className="mt-auto">
        <Button
          variant="soft"
          size="1"
          onClick={onDismiss}
        >
          Dismiss ({remaining}s)
        </Button>
      </Flex>
    </Flex>
  );
}
