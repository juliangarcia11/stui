// File Purpose: Dialog UI pieces - only responsible for showing the dialog, laying out the content, & injecting data
import { Box, Button, Dialog, Flex, Inset } from "@radix-ui/themes";
import { useMemo, type FC } from "react";
import { useTransactionDialog } from "../hooks";
import { useMarketData } from "../hooks/useMarketData";
import type { UITradeGood } from "../types";
import { TransactionTable } from "./TransactionTable";

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
  const { marketData } = useMarketData();
  const good = useMemo(
    () => marketData?.tradeGoods.find((g) => g.symbol === goodSymbol),
    [marketData, goodSymbol],
  );

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <Dialog.Content style={{ paddingBottom: 0 }} minWidth="fit-content">
        <Inset side="all" mb="5">
          <TransactionTable good={good} />
        </Inset>

        <Flex gap="3" mx="-3" my="3" justify="end">
          <Dialog.Close>
            <Button>Close Transactions</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
