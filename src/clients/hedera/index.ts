import { AccountId, Client, Hbar, PrivateKey, PublicKey } from "@hashgraph/sdk";

import { getRequired } from "../../utils/common/env";
import { Network } from "@/clients/hedera/types";

let hederaClient: Client;
let operatorAccountId: AccountId;
let operatorPublicKey: PublicKey;
let operatorPrivateKey: PrivateKey;

export function getOperatorAccountId(): AccountId {
  if (!operatorAccountId) {
    try {
      operatorAccountId = AccountId.fromString(getRequired("OPERATOR_ACCOUNT"));
    } catch (error) {
      console.log("Could not get operator account id");
      throw error;
    }
  }
  return operatorAccountId;
}

export function getOperatorPrivateKey(): PrivateKey {
  if (!operatorPrivateKey) {
    try {
      operatorPrivateKey = PrivateKey.fromString(getRequired("OPERATOR_KEY"));
    } catch (error) {
      console.log("Could not get operator private key");
      throw error;
    }
  }
  return operatorPrivateKey;
}

export function getOperatorPublicKey(): PublicKey {
  if (!operatorPublicKey) {
    try {
      const privateKey = getOperatorPrivateKey();
      operatorPublicKey = privateKey.publicKey;
    } catch (error) {
      console.log("Could not get operator public key");
      throw error;
    }
  }
  return operatorPublicKey;
}

export function getHederaClient(): Client {
  if (!hederaClient) {
    try {
      const network = Network.Testnet;
      const operatorAccount = getOperatorAccountId();
      const operatorKey = getOperatorPrivateKey();
      hederaClient = Client.forName(network)
        .setOperator(operatorAccount, operatorKey)
        .setDefaultMaxTransactionFee(new Hbar(100));
    } catch (error) {
      console.log(error, "Hedera client creation failed");
      throw error;
    }
  }
  return hederaClient;
}
