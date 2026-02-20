import { Flex } from "@radix-ui/themes";
import type { FC, ReactNode } from "react";
import { AppHeader, type AppHeaderPageItem } from "./AppHeader";
import { ThemeProvider } from "./ThemeProvider";

export type AppContainerProps = {
  pages: AppHeaderPageItem[];
  children: ReactNode;
};

/**
 * AppContainer
 * Container component for the entire app, providing layout and theming.
 */
export const AppContainer: FC<AppContainerProps> = ({ pages, children }) => {
  return (
    <ThemeProvider>
      <Flex direction="column" gap="4" width="100vw">
        <AppHeader pages={pages} />
        <Flex direction="column" gap="4" width="100%">
          {children}
        </Flex>
      </Flex>
    </ThemeProvider>
  );
};
