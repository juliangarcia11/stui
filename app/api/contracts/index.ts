import { acceptContract } from "./accept-contract";
import { deliverContract } from "./deliver-contract";
import { fulfillContract } from "./fulfill-contract";
import { getContracts } from "./get-contracts";
import { negotiateContract } from "./negotiate-contract";

export const ContractsApi = {
  acceptContract,
  deliverContract,
  fulfillContract,
  getContracts,
  negotiateContract,
};
