import { Flex, Text } from "@radix-ui/themes";
import type { PropsWithChildren, FC } from "react";

/**
 * Wrap an item so that a red error message will be displayed below it
 */
export const ErrorFormField: FC<PropsWithChildren<{ error?: string }>> = ({
  error,
  children,
}) => (
  <Flex direction="column" gap="1">
    {children}

    {error && (
      <Text as="span" color="red">
        {error}
      </Text>
    )}
  </Flex>
);
