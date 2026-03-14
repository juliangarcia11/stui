// File Purpose: UI Display only - dumb component
import { Badge, Box, Callout, Flex, Heading, Table } from "@radix-ui/themes";
import type { FC, PropsWithChildren } from "react";
import { TextWithHelp } from "~/components";
import { formatRelativeDate } from "~/utils";
import type { UITradeGood } from "../types";
import { TypeBadge } from "./TransactionTypeBadge";
import { CrossCircledIcon } from "@radix-ui/react-icons";

type TransactionTableProps = {
  good?: UITradeGood;
};

/**
 * Table display of transactions for a given trade good, showing:
 * - Index and timestamp
 * - Type (purchase vs sell)
 * - Total price
 * - Units
 * - Price per unit
 */
export const TransactionTable: FC<TransactionTableProps> = ({ good }) => {
  return (
    <Table.Root
      style={{
        borderRadius: "var(--radius-3) var(--radius-3) 0 0",
      }}
    >
      <Table.Header
        style={{
          backgroundColor: "var(--gray-a3)",
        }}
      >
        <Table.Row style={{ color: "var(--gray-12)" }}>
          <Table.ColumnHeaderCell>
            <TransactionGoodHeader good={good} />
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Total Price</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Units</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Price Per Unit</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {good?.transactions.map((tx, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <TransactionIndexCell index={index}>
                {formatRelativeDate(tx.timestamp)}
              </TransactionIndexCell>
            </Table.Cell>
            <Table.Cell>
              <TypeBadge type={tx.type} />
            </Table.Cell>
            <Table.Cell>{tx.totalPrice}</Table.Cell>
            <Table.Cell>{tx.units}</Table.Cell>
            <Table.Cell>{tx.pricePerUnit}</Table.Cell>
          </Table.Row>
        ))}

        {!good?.transactions?.length && (
          <Table.Row>
            <Table.Cell colSpan={5}>
              <EmptyCallout good={good} />
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
};

/**
 * First Header cell of the transaction table, showing the name of the good and a description tooltip if available
 */
const TransactionGoodHeader: FC<{ good?: UITradeGood }> = ({ good }) => {
  return (
    <Flex direction="row" gap="2" align="baseline" asChild>
      <Heading as="h1" size="3">
        {typeof good !== "undefined" && (
          <TextWithHelp
            text={good.name}
            helpText={good.description}
            textProps={{
              style: { color: "var(--accent-11)" },
            }}
          />
        )}
        Transactions
      </Heading>
    </Flex>
  );
};

/**
 * First Table cell of each transaction row, showing the index of the transaction and other content as children.
 * Extracted in case we change our mind on what to show in this cell, but we want to keep the index badge and styling consistent
 */
const TransactionIndexCell: FC<PropsWithChildren<{ index: number }>> = ({
  index,
  children,
}) => {
  return (
    <Flex direction="row" gap="5" align="center">
      <Badge color="gray">{index + 1}</Badge>
      {children}
    </Flex>
  );
};

/**
 * Callout to show when:
 * - No good is selected (good is undefined)
 * - A good is selected but has no transactions
 * Shows a red callout with an error icon and appropriate text in each case
 */
const EmptyCallout: FC<{
  good?: UITradeGood;
}> = ({ good }) => (
  <Callout.Root
    size="1"
    color="red"
    mx="auto"
    style={{ maxWidth: "fit-content" }}
  >
    <Callout.Icon>
      <CrossCircledIcon />
    </Callout.Icon>
    <Callout.Text>
      {!good
        ? "Good not found at this market"
        : `No ${good.name} transactions found at this market`}
    </Callout.Text>
  </Callout.Root>
);
