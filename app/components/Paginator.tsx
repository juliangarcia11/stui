import { Button, type ButtonProps } from "@radix-ui/themes";
import { createSearchParams, useSearchParams, useNavigate } from "react-router";
import type { FC } from "react";

type PaginationButtonProps = {
  to: string; // Base URL
  page: number; // Target page number
  limit?: number; // Items per page
  disabled?: boolean; // Disable button
} & ButtonProps;

/**
 * A reusable button for pagination that dynamically constructs query parameters.
 */
export const PaginationButton: FC<PaginationButtonProps> = ({
  to,
  page,
  limit = 10,
  disabled,
  children,
  ...buttonProps
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = createSearchParams({
    ...Object.fromEntries(searchParams),
    page: page.toString(),
    limit: limit.toString(),
  });

  const handleClick = () => navigate(`${to}?${params.toString()}`);

  return (
    <Button {...buttonProps} disabled={disabled} onClick={handleClick}>
      {children}
    </Button>
  );
};

type PaginatorProps = {
  to?: `/${string}`; // Base URL for pagination links
  totalPages: number;
};

// todo: pending states
export const Paginator: FC<PaginatorProps> = ({ to = "/", totalPages }) => {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  return (
    <div>
      <PaginationButton
        to={to}
        page={1}
        disabled={currentPage === 1}
        color="gray"
      >
        First
      </PaginationButton>
      <PaginationButton
        to={to}
        page={currentPage - 1}
        disabled={currentPage === 1}
        color="gray"
      >
        Previous
      </PaginationButton>
      <PaginationButton
        to={to}
        page={currentPage + 1}
        disabled={currentPage === totalPages}
        color="gray"
      >
        Next
      </PaginationButton>
      <PaginationButton
        to={to}
        page={totalPages}
        disabled={currentPage === totalPages}
        color="gray"
      >
        Last
      </PaginationButton>
    </div>
  );
};
