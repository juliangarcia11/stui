import { Box, Button, Dialog, Flex } from "@radix-ui/themes";
import { Debug } from "~/components";
import { stringifyWithBigInt } from "~/utils";
import { useTransactionDialog } from "../hooks";
import type { UITradeGood } from "../types";
import type { FC } from "react";

export const TransactionDialogTrigger: FC<{ good: UITradeGood }> = ({
  good,
}) => {
  const { openDialog } = useTransactionDialog();

  return (
    <Flex justify="center">
      <Box width="80%" asChild>
        <Button
          size="2"
          disabled={good.transactions.length === 0}
          onClick={() => openDialog(good.symbol)}
        >
          {good.transactions.length === 0
            ? "None"
            : `View (${good.transactions.length})`}
        </Button>
      </Box>
    </Flex>
  );
};

export const TransactionDialog = () => {
  const { isOpen, params, closeDialog } = useTransactionDialog();
  const goodSymbol = params.goodSymbol ?? "";

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Transactions for {goodSymbol}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          some description here
        </Dialog.Description>

        <Debug>{stringifyWithBigInt(params)}</Debug>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button>Close Transactions</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
