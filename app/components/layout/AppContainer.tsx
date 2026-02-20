import { Flex } from "@radix-ui/themes";
import type { FC, PropsWithChildren } from "react";
import { AppHeader, type AppHeaderProps } from "./AppHeader";
import { ThemeProvider } from "./ThemeProvider";

export type AppContainerProps = PropsWithChildren<AppHeaderProps>;

/**
 * AppContainer
 * Container component for the entire app, providing layout and theming.
 */
export const AppContainer: FC<AppContainerProps> = ({
  children,
  ...headerProps
}) => {
  return (
    <ThemeProvider>
      <Flex direction="column" gap="4" width="100vw">
        <AppHeader {...headerProps} />
        <Flex direction="column" gap="4" width="100%">
          {children}
        </Flex>
      </Flex>
    </ThemeProvider>
  );
};
