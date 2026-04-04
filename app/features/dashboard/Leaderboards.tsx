import { Badge, DataList, Flex, Text } from "@radix-ui/themes";
import { useMemo, type FC, type ReactNode } from "react";
import type { GetStatusResponse } from "~/api/client";
import { CreditBadge, StyledCard } from "~/components";
import { numberWithCommas } from "~/utils";

const LeaderLabel: FC<{ leader: string; index: number }> = ({
  leader,
  index,
}) => (
  <Flex direction="row" gap="2">
    <Badge variant="outline">{index + 1}</Badge>
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

export const MostCreditsDataList: FC<{ leaders: MostCredits }> = ({
  leaders,
}) => {
  const items = useMemo(
    () =>
      leaders.slice(0, 5).map((leader) => ({
        label: leader.agentSymbol,
        value: <CreditBadge credits={leader.credits} />,
      })),
    [leaders],
  );

  return (
    <StyledCard title="Credits" outlined>
      <LeaderboardDataList items={items} />
    </StyledCard>
  );
};

export const MostSubmittedChartsDataList: FC<{
  leaders: MostSubmittedCharts;
}> = ({ leaders }) => {
  const items = useMemo(
    () =>
      leaders.slice(0, 5).map((leader) => ({
        label: leader.agentSymbol,
        value: (
          <Badge color="sky">
            {numberWithCommas(leader.chartCount.toString())}
          </Badge>
        ),
      })),
    [leaders],
  );

  return (
    <StyledCard title="Charts" outlined>
      <LeaderboardDataList items={items} />
    </StyledCard>
  );
};

export const Leaderboards: FC<{
  mostCredits: MostCredits;
  mostSubmittedCharts: MostSubmittedCharts;
}> = ({ mostCredits, mostSubmittedCharts }) => (
  <StyledCard title="Agent Leaderboards" headingAs="h2" headingSize="5">
    <Flex direction="row" gap="4" width="fit-content">
      <MostCreditsDataList leaders={mostCredits} />
      <MostSubmittedChartsDataList leaders={mostSubmittedCharts} />
    </Flex>
  </StyledCard>
);
