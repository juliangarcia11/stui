import { DataList, Flex, Text } from "@radix-ui/themes";
import type { PropsWithChildren, ReactNode } from "react";
import { StyledCard } from "./StyledCard";

export type OverviewDataItem<T> = {
  /**
   * The key corresponding to the value in the data object to display for this item.
   */
  key: string;

  /**
   * The label to display for this item.
   */
  label: string;

  /**
   * Optional custom render function for this item. If not provided, the value will be displayed as a string by default.
   */
  render?: (data: T) => ReactNode | undefined;
};

export type OverviewDataCardProps<T> = {
  /**
   * Title of the card
   */
  title: string;

  /**
   * Optional icon to display next to the title
   */
  icon?: ReactNode;

  /**
   * List of data items to display, each with a key, label, and optional custom render function.
   * If no render function is provided, the value will be displayed as a string by default.
   */
  items: OverviewDataItem<T>[];

  /**
   * The data object containing the values to display, where each key corresponds to an item in the `items` array.
   */
  data: T;
};

/**
 * Display an overview of data in a card format, with a title, optional icon, and a list of key-value pairs.
 * Each value can be rendered using a custom function or displayed as a string by default.
 */
export const OverviewDataCard = <T,>({
  title,
  icon,
  items,
  data,
  children,
}: PropsWithChildren<OverviewDataCardProps<T>>) => {
  const Title = (
    <Flex gap="1" align="center">
      {icon}
      <Text as="span">{title}</Text>
    </Flex>
  );

  return (
    <StyledCard title={Title} headingAs="h2" headingSize="4">
      <Flex direction="column" gap="2">
        <DataList.Root>
          {items.map(({ key, label, render }) => (
            <DataList.Item key={key} align="center">
              <DataList.Label>{label}</DataList.Label>
              <DataList.Value>
                {render ? render(data) : `${data[key as keyof T]}`}
              </DataList.Value>
            </DataList.Item>
          ))}
        </DataList.Root>

        {/* optional footer-ish content */}
        {children}
      </Flex>
    </StyledCard>
  );
};
