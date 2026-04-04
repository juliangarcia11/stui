import { Box, Card, Flex, Heading, type HeadingProps } from "@radix-ui/themes";
import type { FC, PropsWithChildren, ReactNode } from "react";

const TRANSPARENT_OVERRIDE = {
  "--card-background-color": "transparent",
} as React.CSSProperties;

type StyledCardProps = {
  title: ReactNode;
  outlined?: boolean;
  headingAs?: HeadingProps["as"];
  headingSize?: HeadingProps["size"];
};

/**
 * Reusable card styled for all sorts of components
 */
export const StyledCard: FC<PropsWithChildren<StyledCardProps>> = ({
  title,
  outlined = false,
  headingAs = "h3",
  headingSize = "3",
  children,
}) => (
  <Box width="fit-content" asChild>
    <Card style={!outlined ? undefined : TRANSPARENT_OVERRIDE}>
      <Flex direction="column" gap="2" width="fit-content" m="auto">
        <Flex m="auto" align="center" asChild>
          <Heading as={headingAs} size={headingSize}>
            {title}
          </Heading>
        </Flex>

        {children}
      </Flex>
    </Card>
  </Box>
);
