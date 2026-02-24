import { Box, Card, Flex, Heading, type HeadingProps } from "@radix-ui/themes";
import type { FC, PropsWithChildren } from "react";

const TRANSPARENT_OVERRIDE = {
  "--card-background-color": "transparent",
} as React.CSSProperties;

/**
 * Reusable card styled for all sorts of dashboard components
 */
export const DashboardCard: FC<
  PropsWithChildren<{
    title: string;
    outlined?: boolean;
    headingAs?: HeadingProps["as"];
    headingSize?: HeadingProps["size"];
  }>
> = ({
  title,
  outlined = false,
  headingAs = "h3",
  headingSize = "3",
  children,
}) => (
  <Box width="fit-content" asChild>
    <Card style={!outlined ? undefined : TRANSPARENT_OVERRIDE}>
      <Flex direction="column" gap="2" width="fit-content" m="auto">
        <Box m="auto" asChild>
          <Heading as={headingAs} size={headingSize}>
            {title}
          </Heading>
        </Box>

        {children}
      </Flex>
    </Card>
  </Box>
);
