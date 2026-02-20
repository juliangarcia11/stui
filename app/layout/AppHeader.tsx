import { Box, Flex, TabNav, Text } from "@radix-ui/themes";
import type { FC } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { NavLink } from "react-router";

export type AppHeaderPageItem = {
  label: string;
  href: string;
  active?: boolean;
};

export type AppHeaderProps = {
  title: string;
  pages: AppHeaderPageItem[];
};

/**
 * AppHeader
 * A navigation header component that includes links to different sections of the app.
 */
export const AppHeader: FC<AppHeaderProps> = ({ title, pages }) => {
  return (
    <TabNav.Root size="2" wrap="nowrap" justify="start" color="indigo">
      <Flex direction="row" width="100%" align="center" justify="between" p="1">
        <NavLink to="/">
          {({ isActive }) => (
            <TabNav.Link asChild active={isActive}>
              <Text size="4" weight="bold">
                {title}
              </Text>
            </TabNav.Link>
          )}
        </NavLink>

        <Flex direction="row" gap="4">
          {pages.map((page) => (
            <NavLink key={page.href} to={page.href}>
              {({ isActive }) => (
                <TabNav.Link asChild active={isActive}>
                  <Text size="4">{page.label}</Text>
                </TabNav.Link>
              )}
            </NavLink>
          ))}
        </Flex>

        <Box mr="1">
          <ThemeToggle />
        </Box>
      </Flex>
    </TabNav.Root>
  );
};
