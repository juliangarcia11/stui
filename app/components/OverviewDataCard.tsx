import { Box, Card, DataList, Flex, Heading, Text } from "@radix-ui/themes";
import type { ReactNode } from "react";

export type OverviewDataItemRender<T> = (
  key: keyof T,
  data: T,
) => ReactNode | undefined;

export type OverviewDataItem<T> = {
  key: keyof T;
  label: string;
  render?: OverviewDataItemRender<T>;
};

export type OverviewDataCardProps<T> = {
  title: string;
  icon?: ReactNode;
  items: OverviewDataItem<T>[];
  data: T;
};

export const OverviewDataCard = <T,>({
  title,
  icon,
  items,
  data,
}: OverviewDataCardProps<T>) => {
  return (
    <Box width="fit-content" asChild>
      <Card>
        <Flex direction="column" gap="3" align="center">
          <Heading as="h2" size="4" asChild>
            <Flex gap="1" align="center">
              {icon}
              <Text as="span">{title}</Text>
            </Flex>
          </Heading>
          <DataList.Root>
            {items.map(({ key, label, render }) => (
              <DataList.Item key={key.toString()} align="center">
                <DataList.Label>{label}</DataList.Label>
                <DataList.Value>
                  {render ? render(key, data) : `${data[key]}`}
                </DataList.Value>
              </DataList.Item>
            ))}
          </DataList.Root>
        </Flex>
      </Card>
    </Box>
  );
};
