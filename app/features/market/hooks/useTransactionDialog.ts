import { useDialogParams } from "~/hooks";

const TRANSACTION_DIALOG_KEY = "OPEN_TRANSACTIONS";
const GOOD_KEY = "goodSymbol";

/**
 * Custom hook to manage the transaction dialog state for a specific trade good.
 * The good's symbol is added the the URL parameters when opening the dialog, allowing the dialog component to access it and display relevant transactions.
 * @see useDialogParams for the underlying implementation of dialog open/closed state management
 */
export function useTransactionDialog() {
  const {
    isOpen,
    params,
    closeDialog,
    openDialog: _openDialog,
  } = useDialogParams({
    dialogKey: TRANSACTION_DIALOG_KEY,
    extraKeys: [GOOD_KEY],
  });

  // Extend the openDialog function to add a goodSymbol parameter for the dialog to use
  const openDialog = (goodSymbol: string) =>
    _openDialog({
      [GOOD_KEY]: goodSymbol,
    });

  return { isOpen, params, openDialog, closeDialog };
}
