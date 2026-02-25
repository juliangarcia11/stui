import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Blockquote,
  Box,
  Card,
  Flex,
  Heading,
  HoverCard,
  IconButton,
  Text,
} from "@radix-ui/themes";
import type { FC } from "react";
import type { GetStatusResponse } from "~/api/client";
import { formatRelativeDate } from "~/utils/dates";

/**
 * ServerInfoCards
 *
 * Two different card components that display a subset of the information returned by the "/" endpoint:
 * - status
 * - version
 * - resetDate (last reset date)
 * - serverResets.next (next reset date)
 */

/**
 * ServerInfoCard - Static
 * An in-line display of the ServerInfoCardContent
 */
export const ServerInfoStaticCard: FC<GetStatusResponse> = (props) => {
  return (
    <Box width="fit-content">
      <Card size="2">
        <ServerInfoCardContent {...props} />
      </Card>
    </Box>
  );
};

/**
 * ServerInfoCard - Hover
 * Show the ServerInfoCardContent in an overlay on hover of a circle info icon button
 */
export const ServerInfoHoverCard: FC<GetStatusResponse> = (props) => (
  <HoverCard.Root>
    <HoverCard.Trigger>
      <IconButton variant="ghost" radius="full" size="1" type="button">
        <InfoCircledIcon width="1rem" height="1rem" />
      </IconButton>
    </HoverCard.Trigger>
    <HoverCard.Content maxWidth="fit-content">
      <ServerInfoCardContent {...props} />
    </HoverCard.Content>
  </HoverCard.Root>
);

/**
 * Inner UI for ServerInfoCards
 */
const ServerInfoCardContent: FC<GetStatusResponse> = ({
  status,
  version,
  resetDate,
  serverResets,
}) => (
  <Flex direction="column" gap="2">
    <Flex direction="row" align="center" justify="between" gap="2">
      <Heading size="4">Server Info</Heading>
      <Badge>{version}</Badge>
    </Flex>
    <Blockquote>
      <Text size="1">{status}</Text>
    </Blockquote>
    <Flex gap="2" justify="between" wrap="nowrap">
      <ServerDateBadge
        label="Last Reset"
        value={formatRelativeDate(resetDate)}
      />
      <ServerDateBadge
        label="Next Reset"
        value={formatRelativeDate(serverResets.next)}
      />
    </Flex>
  </Flex>
);

/**
 * Pre-styled badge for label/value pairs displayed in a row
 */
const ServerDateBadge: FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <Badge size="1">
    <Flex direction="row" gap="3" align="center" wrap="nowrap">
      <Text as="div" size="2" weight="bold">
        {label}
      </Text>
      <Text as="div" size="2" truncate style={{ color: "var(--accent-12)" }}>
        {value}
      </Text>
    </Flex>
  </Badge>
);
