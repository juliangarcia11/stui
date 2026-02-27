import { Button } from "@radix-ui/themes";
import type { FC } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router";
import type { PaginationButtonProps } from "./types";

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
