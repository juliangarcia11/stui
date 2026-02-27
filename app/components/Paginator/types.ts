import type { ButtonProps } from "@radix-ui/themes";
import type { ReactNode } from "react";

export type BaseButtonProps = Omit<ButtonProps, "onClick">; // Exclude onClick to prevent conflicts
export type PaginationButtonProps = {
  to: string; // Base URL
  page: number; // Target page number
  limit?: number; // Items per page
  disabled?: boolean; // Disable button
} & BaseButtonProps;

export type PaginatorButtons = "first" | "previous" | "next" | "last";
export type PaginatorVariants = "text" | "icon";
export type PaginatorButtonConfig = Record<
  PaginatorButtons,
  Record<PaginatorVariants, string | ReactNode> & {
    page: (currentPage: number, totalPages: number) => number;
    disableOn: (currentPage: number, totalPages: number) => boolean;
  }
>;
export type PaginatorProps = {
  buttonProps?: BaseButtonProps; // Styling props for all buttons
  to?: `/${string}`; // Base URL for pagination links
  totalPages: number;
  variant?: PaginatorVariants;
};
