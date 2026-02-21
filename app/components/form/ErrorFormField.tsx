import { Box, Flex, Text } from "@radix-ui/themes";
import type { FC, PropsWithChildren } from "react";

/**
 * Wrap an item so that a red error message will be displayed below it
 */
export const ErrorFormField: FC<
  PropsWithChildren<{ error?: string; errorPrefix?: string }>
> = ({ error, errorPrefix = "*", children }) => (
  <Box maxWidth="fit-content" asChild>
    <Flex direction="column" gap="1">
      {children}

      {error && (
        <Text as="span" color="red" size="1">
          {[errorPrefix, error].join(" ").trim()}
        </Text>
      )}
    </Flex>
  </Box>
);
