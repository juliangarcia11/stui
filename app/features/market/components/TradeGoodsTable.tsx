// File Purpose: UI Display - WIP
import { Table } from "@radix-ui/themes";
import type { FC } from "react";
import { extractSchemaDescriptions } from "~/api";
import {
  ActivityLevelSchema,
  MarketTradeGoodSchema,
  SupplyLevelSchema,
} from "~/api/client/schemas.gen";
import { TextWithHelp } from "~/components";
import type { UITradeGood } from "../types";

const HELP = {
  ...extractSchemaDescriptions(MarketTradeGoodSchema),
  ...extractSchemaDescriptions({
    properties: { supply: SupplyLevelSchema },
  }),
  ...extractSchemaDescriptions({
    properties: { activity: ActivityLevelSchema },
  }),
};

export const TradeGoodsTable: FC<{ goods?: UITradeGood[] }> = ({
  goods = [],
}) => {
  return (
    <Table.Root variant="surface" size="1">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Good</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <TextWithHelp text="Trade Volume" helpText={HELP.tradeVolume} />
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <TextWithHelp text="Supply" helpText={HELP.supply} />
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <TextWithHelp text="Activity" helpText={HELP.activity} />
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <TextWithHelp text="Purchase Price" helpText={HELP.purchasePrice} />
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <TextWithHelp text="Sell Price" helpText={HELP.sellPrice} />
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {goods.map((good) => (
          <Table.Row key={good.symbol}>
            <Table.RowHeaderCell>
              <TextWithHelp text={good.name} helpText={good.description} />
            </Table.RowHeaderCell>
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
