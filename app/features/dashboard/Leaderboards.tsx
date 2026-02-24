import {
  Badge,
  Box,
  Card,
  DataList,
  Flex,
  Heading,
  Text,
  type HeadingProps,
} from "@radix-ui/themes";
import {
  useMemo,
  type FC,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import type { GetStatusResponse } from "~/client";

const TRANSPARENT_OVERRIDE = {
  "--card-background-color": "transparent",
} as React.CSSProperties;

const LeaderboardCard: FC<
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

const LeaderLabel: FC<{ leader: string; index: number }> = ({
  leader,
  index,
}) => (
  <Flex direction="row" gap="2">
    <Badge variant="outline" radius="full">
      {index + 1}.
    </Badge>
    &nbsp;
    <Text as="span">{leader}</Text>
  </Flex>
);

type LeaderboardDataListProps = {
  items: { label: string; value: ReactNode }[];
};

/**
 * Minimal extra stylings, just provide items
 */
const LeaderboardDataList: FC<LeaderboardDataListProps> = ({ items }) => (
  <DataList.Root>
    {items.map((item, index) => (
      <DataList.Item key={`${item.label}_${index}`} align="center">
        <DataList.Label minWidth="88px">
          <LeaderLabel leader={item.label} index={index} />
        </DataList.Label>
        <DataList.Value>{item.value}</DataList.Value>
      </DataList.Item>
    ))}
  </DataList.Root>
);

type MostCredits = GetStatusResponse["leaderboards"]["mostCredits"];
type MostSubmittedCharts =
  GetStatusResponse["leaderboards"]["mostSubmittedCharts"];

function numberWithCommas(x: number | string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const MostCreditsDataList: FC<{ leaders: MostCredits }> = ({
  leaders,
}) => {
  const items = useMemo(
    () =>
      leaders.slice(0, 5).map((leader) => ({
        label: leader.agentSymbol,
        value: (
          <Badge color="jade" variant="soft" radius="full">
            ${numberWithCommas(leader.credits.toString())}
          </Badge>
        ),
      })),
    [leaders],
  );

  return (
    <LeaderboardCard title="Credits" outlined>
      <LeaderboardDataList items={items} />
    </LeaderboardCard>
  );
};

export const MostSubmittedChartsDataList: FC<{
  leaders: MostSubmittedCharts;
}> = ({ leaders }) => {
  const items = useMemo(
    () =>
      leaders.slice(0, 5).map((leader) => ({
        label: leader.agentSymbol,
        value: numberWithCommas(leader.chartCount.toString()),
      })),
    [leaders],
  );

  return (
    <LeaderboardCard title="Charts" outlined>
      <LeaderboardDataList items={items} />
    </LeaderboardCard>
  );
};

export const Leaderboards: FC<{
  mostCredits: MostCredits;
  mostSubmittedCharts: MostSubmittedCharts;
}> = ({ mostCredits, mostSubmittedCharts }) => (
  <LeaderboardCard title="Agent Leaderboards" headingAs="h2" headingSize="5">
    <Flex direction="row" gap="4" width="fit-content">
      <MostCreditsDataList leaders={mostCredits} />
      <MostSubmittedChartsDataList leaders={mostSubmittedCharts} />
    </Flex>
  </LeaderboardCard>
);
