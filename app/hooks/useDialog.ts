import { useCallback } from "react";
import { useSearchParams } from "react-router";

// ─── Constants ───────────────────────────────────────────────────────────────

const DIALOG_SEARCH_KEY = "open" as const;

// ─── Types ────────────────────────────────────────────────────────────────────

interface UseDialogReturn {
  /** Whether this dialog's key is currently active in the URL */
  isOpen: boolean;
  /** Opens the dialog by adding `?open=<dialogKey>` to the URL */
  openDialog: () => void;
  /** Closes the dialog by removing the `open` search param */
  closeDialog: () => void;
  /** Toggles the dialog open/closed state */
  toggleDialog: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getIsOpen = (params: URLSearchParams, key: string): boolean =>
  params.get(DIALOG_SEARCH_KEY) === key;

const buildOpenParams = (
  params: URLSearchParams,
  key: string,
): URLSearchParams => {
  const next = new URLSearchParams(params);
  next.set(DIALOG_SEARCH_KEY, key);
  return next;
};

const buildCloseParams = (params: URLSearchParams): URLSearchParams => {
  const next = new URLSearchParams(params);
  next.delete(DIALOG_SEARCH_KEY);
  return next;
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * `useDialog` — URL-driven dialog state via React Router search params.
 *
 * Reads `?open=<dialogKey>` from the URL to determine visibility, and
 * provides helpers to open, close, or toggle the dialog — all without
 * losing any other search params already in the URL.
 *
 * @param dialogKey - A unique string identifying this dialog (e.g. "confirm-delete")
 *
 * @example
 * const { isOpen, openDialog, closeDialog } = useDialog("settings");
 *
 * // URL: /page?open=settings  →  isOpen = true
 * // URL: /page                →  isOpen = false
 */
export const useDialog = (dialogKey: string): UseDialogReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isOpen = getIsOpen(searchParams, dialogKey);

  const openDialog = useCallback(
    () => setSearchParams(buildOpenParams(searchParams, dialogKey)),
    [searchParams, setSearchParams, dialogKey],
  );

  const closeDialog = useCallback(
    () => setSearchParams(buildCloseParams(searchParams)),
    [searchParams, setSearchParams],
  );

  const toggleDialog = useCallback(
    () => (isOpen ? closeDialog() : openDialog()),
    [isOpen, openDialog, closeDialog],
  );

  return { isOpen, openDialog, closeDialog, toggleDialog };
};
