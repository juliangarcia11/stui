// File Purpose: UI Display - WIP
import { Table } from "@radix-ui/themes";
import type { FC } from "react";
import type { MarketTradeGood } from "~/api/client";

export const TradeGoodsTable: FC<{ goods?: MarketTradeGood[] }> = ({
  goods = [],
}) => {
  return (
    <Table.Root variant="surface" size="1">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Symbol</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Trade Volume</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Supply</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Activity</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Purchase Price</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Sell Price</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {goods.map((good) => (
          <Table.Row key={good.symbol}>
            <Table.RowHeaderCell>{good.symbol}</Table.RowHeaderCell>
            <Table.Cell>{good.type}</Table.Cell>
            <Table.Cell>{good.tradeVolume}</Table.Cell>
            <Table.Cell>{good.supply}</Table.Cell>
            <Table.Cell>{good.activity}</Table.Cell>
            <Table.Cell>{good.purchasePrice}</Table.Cell>
            <Table.Cell>{good.sellPrice}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
