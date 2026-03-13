import { useMemo } from "react";
import type { TradeSymbol } from "~/api/client";
import { useParams } from "~/hooks";

const ACTION_KEY = "action";
const TRANSACTION_DIALOG_KEY = "OPEN_TRANSACTIONS";
const GOOD_KEY = "goodSymbol";

export function useTransactionDialog() {
  const { params, has, setParams } = useParams({
    keys: [ACTION_KEY, GOOD_KEY],
    matchers: {
      [ACTION_KEY]: (value) => value === TRANSACTION_DIALOG_KEY,
    },
  });

  const openDialog = (goodSymbol: TradeSymbol) =>
    setParams({
      [ACTION_KEY]: TRANSACTION_DIALOG_KEY,
      [GOOD_KEY]: goodSymbol,
    });

  const closeDialog = () =>
    setParams({
      [ACTION_KEY]: undefined,
      [GOOD_KEY]: undefined,
    });

  const isOpen = useMemo(() => has(ACTION_KEY), [has]);

  return { isOpen, params, openDialog, closeDialog };
}
