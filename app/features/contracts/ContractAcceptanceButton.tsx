import type { FC } from "react";
import { ButtonFetcherForm } from "~/components";

export const ContractAcceptanceButton: FC<{ contractId: string }> = ({
  contractId,
}) => {
  return (
    <ButtonFetcherForm
      action="/api/contract-flow"
      method="POST"
      hiddenValues={{ action: "ACCEPT_CONTRACT", contractId }}
      color="jade"
      size="1"
      submittingText="Accepting..."
    >
      Accept Contract
    </ButtonFetcherForm>
  );
};
