import { useMemo } from "react";
import { useParams, type MatcherFunction, type TKeyParams } from "./useParams";

export type UseDialogParamsOptions<TKeys extends string> = {
  /**
   * A unique string key representing the specific dialog to manage.
   */
  dialogKey: string;
  /**
   * An array of additional parameter keys to track for the dialog.
   */
  extraKeys?: TKeys[];
};

const ACTION_KEY = "action";

/**
 * An extension of the `useParams` hook that provides a structured way to:
 * - open/close a UI dialog via URL parameters
 * - track extra parameters related to the dialog (e.g. which item the dialog is for)
 *
 * @see useParams for the underlying implementation of URL parameter management
 * @param dialogKey - A unique string key representing the specific dialog to manage.
 * @param extraKeys - An array of additional parameter keys to track for the dialog.
 * @returns An object containing:
 *   - `isOpen`: A boolean indicating whether the dialog is currently open.
 *   - `params`: The current URL parameters relevant to the dialog (e.g. action & extra keys).
 *   - `openDialog`: A function to open the dialog with optional extra parameters.
 *   - `closeDialog`: A function to close the dialog and clear relevant URL parameters.
 *
 * @example
 * // Create a custom hook for a specific dialog (e.g. transaction dialog for a trade good)
 * function useTransactionDialog() {
 *   const { isOpen, params, openDialog: _openDialog, closeDialog } = useDialogParams({
 *     dialogKey: "OPEN_TRANSACTIONS",
 *     extraKeys: ["goodSymbol"],
 *   });
 *
 *   // Extend the openDialog function to add a goodSymbol parameter for the dialog to use
 *   const openDialog = (goodSymbol: string) =>
 *     _openDialog({
 *       goodSymbol,
 *     });
 *
 *   return { isOpen, params, openDialog, closeDialog };
 * }
 */
export function useDialogParams<TKeys extends string>({
  dialogKey,
  extraKeys = [],
}: UseDialogParamsOptions<TKeys>) {
  const { params, has, setParams } = useParams({
    keys: [ACTION_KEY, ...extraKeys],
    matchers: {
      [ACTION_KEY]: (value) => value === dialogKey,
    } as Partial<Record<"action" | TKeys, MatcherFunction>>,
  });

  const openDialog = (extraParams?: Partial<Record<TKeys, string>>) =>
    setParams({
      [ACTION_KEY]: dialogKey,
      ...extraParams,
    } as Partial<TKeyParams<"action" | TKeys>>);

  const closeDialog = () =>
    setParams({
      [ACTION_KEY]: undefined,
      ...Object.fromEntries(extraKeys.map((key) => [key, undefined])),
    } as Partial<TKeyParams<"action" | TKeys>>);

  const isOpen = useMemo(() => has(ACTION_KEY), [has]);

  return { isOpen, params, openDialog, closeDialog };
}
