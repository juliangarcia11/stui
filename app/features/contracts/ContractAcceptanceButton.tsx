import type { FC } from "react";
import { ButtonForm } from "~/components";

export const ContractAcceptanceButton: FC<{ contractId: string }> = ({
  contractId,
}) => {
  return (
    <ButtonForm
      method="POST"
      action="/contracts/accept"
      hiddenValues={{ contractId }}
      color="jade"
    >
      Accept Contract
    </ButtonForm>
  );
};
