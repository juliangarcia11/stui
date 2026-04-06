import type { FC } from "react";
import { ButtonFetcherForm } from "~/components";

const action = "API.Contracts.negotiateContract";

/**
 * Button component for negotiating a contract.
 * Uses the ButtonForm component to submit a POST request to the API with the contract ID when clicked.
 * Page Route Action must contain a handler for the "API.Contracts.negotiateContract" action key.
 */
export const ContractNegotiationButton: FC<{ contractId: string }> = ({
  contractId,
}) => {
  return (
    <ButtonFetcherForm
      method="POST"
      hiddenValues={{ action, contractId }}
      color="orange"
      submittingText="Negotiating..."
    >
      Negotiate Contract
    </ButtonFetcherForm>
  );
};
