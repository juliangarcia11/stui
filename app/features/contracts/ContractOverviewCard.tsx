import { FileTextIcon } from "@radix-ui/react-icons";
import { Badge, Flex } from "@radix-ui/themes";
import type { Contract, FactionSymbol } from "~/api/client";
import {
  CreditBadge,
  InfoText,
  OverviewDataCard,
  type OverviewDataItem,
} from "~/components";
import { FactionBadge } from "~/features/factions";
import { formatRelativeDate } from "~/utils";
import { ContractAcceptanceButton } from "./ContractAcceptanceButton";

const CONTRACT_OVERVIEW_INFO =
  "Accepting locks you into these terms. You'll earn some upfront and the remainder on delivery.";

const OVERVIEW_DATA: OverviewDataItem<Contract>[] = [
  {
    key: "factionSymbol",
    label: "Faction",
    render: (contract) => (
      <FactionBadge factionSymbol={contract.factionSymbol as FactionSymbol} />
    ),
  },
  {
    key: "goodsSummary",
    label: "Goods",
    render: (contract) =>
      contract.terms.deliver
        ? `${contract.terms.deliver.length} item${contract.terms.deliver.length === 1 ? "s" : ""}`
        : "N/A",
  },
  {
    key: "deadlineToAccept",
    label: "Acceptance Deadline",
    render: (contract) =>
      contract.deadlineToAccept ? (
        formatRelativeDate(contract.deadlineToAccept)
      ) : (
        <Badge color="red">Unknown</Badge>
      ),
  },
  {
    key: "onAccepted",
    label: "On Acceptance",
    render: (contract) => (
      <CreditBadge credits={contract.terms.payment.onAccepted} />
    ),
  },
  {
    key: "onFulfilled",
    label: "On Fulfillment",
    render: (contract) => (
      <CreditBadge credits={contract.terms.payment.onFulfilled} />
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (contract) => (
      <Badge
        color={
          contract.accepted ? "blue" : contract.fulfilled ? "gray" : "green"
        }
      >
        {contract.accepted
          ? "Accepted"
          : contract.fulfilled
            ? "Fulfilled"
            : "New"}
      </Badge>
    ),
  },
];

export const ContractOverviewCard = ({ contract }: { contract: Contract }) => {
  return (
    <OverviewDataCard
      title="Contract Overview"
      icon={<FileTextIcon />}
      items={OVERVIEW_DATA}
      data={contract}
    />
  );
};

export const ContractQuickstartOverviewCard = ({
  contract,
}: {
  contract: Contract;
}) => {
  return (
    <OverviewDataCard
      title="New Contract"
      icon={<FileTextIcon />}
      items={OVERVIEW_DATA}
      data={contract}
    >
      <InfoText text={CONTRACT_OVERVIEW_INFO} />

      <Flex justify="center">
        <ContractAcceptanceButton contractId={contract.id} />
      </Flex>
    </OverviewDataCard>
  );
};
