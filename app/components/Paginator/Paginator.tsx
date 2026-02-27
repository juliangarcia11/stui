import { Flex } from "@radix-ui/themes";
import type { FC } from "react";
import { useSearchParams } from "react-router";
import { PaginationButton } from "./Button";
import { PaginationConfig } from "./config";
import type { PaginatorProps } from "./types";

// todo: pending states

/**
 * A flexible paginator component that generates pagination buttons based on our provided configuration.
 * It reads the current page from URL search parameters and constructs navigation links accordingly.
 * The component supports both text and icon variants for buttons, and allows for some custom styling through buttonProps.
 * @see PaginationButton for individual button behavior
 * @see PaginationConfig for button definitions.
 */
export const Paginator: FC<PaginatorProps> = ({
  buttonProps,
  to = "/",
  totalPages,
  variant = "icon",
}) => {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  return (
    <Flex direction="row" gap="2" asChild>
      <nav aria-label="Pagination">
        {Object.entries(PaginationConfig).map(([key, config]) => (
          <PaginationButton
            key={key}
            to={to}
            page={config.page(currentPage, totalPages)}
            disabled={config.disableOn(currentPage, totalPages)}
            {...buttonProps}
          >
            {config[variant]}
          </PaginationButton>
        ))}
      </nav>
    </Flex>
  );
};
