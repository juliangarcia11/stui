import { Box, Button, Dialog, Flex } from "@radix-ui/themes";
import { useMemo, type FC } from "react";
import { Debug, TextWithHelp } from "~/components";
import { stringifyWithBigInt } from "~/utils";
import { useTransactionDialog } from "../hooks";
import { useMarketData } from "../hooks/useMarketData";
import type { UITradeGood } from "../types";

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
  const transactions = good?.transactions ?? [];

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>
          <Flex direction="row" align="center" gap="2">
            Transactions -
            <TextWithHelp
              text={good?.name ?? goodSymbol}
              helpText={good?.description}
            />
          </Flex>
        </Dialog.Title>

        {/* TODO: add transactions table */}
        {/* TODO: add purchase/sell action triggers */}
        <Debug>{stringifyWithBigInt(transactions)}</Debug>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button>Close Transactions</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
