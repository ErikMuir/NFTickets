import { PublicKey, Transaction, AccountId, TransactionId, PrivateKey } from "@hashgraph/sdk";

import { getOperatorPrivateKey, getOperatorAccountId } from "@/clients/hedera";

class HederaSigningService {
  accountId: AccountId;
  private privateKey: PrivateKey;
  publicKey: PublicKey;

  constructor(accountId: AccountId, privateKey: PrivateKey) {
    this.accountId = accountId;
    this.privateKey = privateKey;
    this.publicKey = privateKey.publicKey;
  }

  signAndMakeBytes = (trans: Transaction, signingAcctId: string): Uint8Array => {
    const nodeId = [new AccountId(3)];
    const transId = TransactionId.generate(signingAcctId);
    trans.setNodeAccountIds(nodeId);
    trans.setTransactionId(transId);
    trans = trans.freeze();
    const transBytes = trans.toBytes();
    const sig = this.privateKey.signTransaction(Transaction.fromBytes(transBytes));
    const out = trans.addSignature(this.publicKey, sig);
    const outBytes = out.toBytes();
    console.log("Transaction bytes", outBytes);
    return outBytes;
  };

  makeBytes = (trans: Transaction, signingAcctId: string): Uint8Array => {
    const transId = TransactionId.generate(signingAcctId);
    trans.setTransactionId(transId);
    trans.setNodeAccountIds([new AccountId(3)]);
    trans.freeze();
    const transBytes = trans.toBytes();
    return transBytes;
  };

  signData = (
    data: object
  ): {
    signature: string;
    serverSigningAccount: string;
  } => {
    const bytes = new Uint8Array(Buffer.from(JSON.stringify(data)));
    const signature = this.privateKey.sign(bytes);
    this.publicKey.verify(bytes, signature); //this will be true
    return {
      signature: Buffer.from(signature).toString("base64"),
      serverSigningAccount: this.accountId.toString(),
    };
  };

  verifyData = (data: object, publicKey: PublicKey, signature: Uint8Array): boolean => {
    const bytes = new Uint8Array(Buffer.from(JSON.stringify(data)));
    const verify = publicKey.verify(bytes, signature);
    return verify;
  };
}

let hederaSigningService: HederaSigningService;

export async function getHederaSigningService(): Promise<HederaSigningService> {
  if (!hederaSigningService) {
    const accountId = await getOperatorAccountId();
    const privateKey = await getOperatorPrivateKey();
    hederaSigningService = new HederaSigningService(accountId, privateKey);
  }
  return hederaSigningService;
}
