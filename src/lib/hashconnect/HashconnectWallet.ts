import { AccountId, Transaction, TransactionId } from "@hashgraph/sdk";
import { HashConnectTypes, MessageTypes } from "hashconnect";
import invariant from "tiny-invariant";
import { Network } from "@/clients/hedera/types";
import { fetchStandardJson } from "@/lib/fetch-json";
import { hashconnect } from "@/lib/hashconnect";
import {
  AuthenticationResult,
  HashconnectAuthenticationRequest,
  HashconnectConnectionData,
  HashconnectInitiateAuthResult,
} from "@/lib/hashconnect/types";
import { LoggedInUser } from "@/lib/user/types";

const appMetadata: HashConnectTypes.AppMetadata = {
  name: "NFTicket",
  description: "A ledger-based ticketing system for live events",
  icon: "https://nftickets-beta.vercel.app/logo.png",
};

let hashconnectWallet: HashconnectWallet | undefined;
export function getHashConnectWallet(): HashconnectWallet {
  if (!hashconnectWallet) {
    hashconnectWallet = new HashconnectWallet(Network.Testnet);
  }
  return hashconnectWallet;
}

class HashconnectWallet {
  private _network: Network;
  private _connectionData: HashconnectConnectionData | undefined;
  private _isExtensionAvailable = false;

  constructor(network: Network) {
    this._network = network;
  }

  get connectionData() {
    return this._connectionData;
  }

  get isExtensionAvailable() {
    return this._isExtensionAvailable;
  }

  foundExtension() {
    this._isExtensionAvailable = true;
  }

  async connectToLocalWallet() {
    hashconnect.connectToLocalWallet();
  }

  async sendTransaction(
    trans: Transaction,
    acctToSign: string,
    hashConnectTopic: string
  ) {
    const transId = TransactionId.generate(acctToSign);
    trans.setTransactionId(transId);
    trans.setNodeAccountIds([new AccountId(3)]);
    trans.freeze();
    const transBytes = trans.toBytes();

    return this.sendTransactionBytes(transBytes, acctToSign, hashConnectTopic);
  }

  async sendTransactionBytes(
    transBytes: Uint8Array,
    acctToSign: string,
    hashConnectTopic: string
  ) {
    await this.initialize();

    const transaction: MessageTypes.Transaction = {
      topic: hashConnectTopic,
      byteArray: transBytes,
      metadata: {
        accountToSign: acctToSign,
        returnTransaction: false,
        hideNft: false,
      },
    };

    return hashconnect.sendTransaction(hashConnectTopic, transaction);
  }

  private async serverInitiateAuth(
    accountId: string
  ): Promise<HashconnectInitiateAuthResult> {
    if (!this._connectionData) {
      throw new Error("Not connected");
    }
    const { topic } = this._connectionData;
    const initiateAuthRequest = { topic, accountId, network: this._network };
    return fetchStandardJson<HashconnectInitiateAuthResult>(
      `/api/user/initiate-auth`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(initiateAuthRequest),
      }
    );
  }

  private async serverAuthenticate(
    authenticationPayload: HashconnectAuthenticationRequest
  ): Promise<LoggedInUser> {
    return fetchStandardJson<LoggedInUser>(`/api/user/authenticate`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(authenticationPayload),
    });
  }

  async initialize(): Promise<void> {
    if (this._connectionData) {
      return;
    }

    try {
      this._connectionData = await hashconnect.init(
        appMetadata,
        this._network,
        true
      );
    } catch (e) {
      console.error((e as Error).message);
      throw e;
    }
  }

  async disconnect(): Promise<void> {
    if (!this._connectionData) {
      console.warn("Disconnected called before initialized");
      return;
    }
    try {
      if (this._connectionData?.topic) {
        await hashconnect.disconnect(this._connectionData?.topic);
      }
      this._connectionData = undefined; // do we need this?
    } catch (e) {
      console.error((e as Error).message);
      throw e;
    }
  }

  async authenticate(accountId: string): Promise<AuthenticationResult> {
    try {
      await this.initialize();
      invariant(this._connectionData);

      const initiateAuthPayload = await this.serverInitiateAuth(accountId);
      const { serverSigningAccount, signature, payload } = initiateAuthPayload;
      const { topic } = this._connectionData;
      const authenticationResult = await hashconnect.authenticate(
        topic,
        accountId,
        serverSigningAccount,
        Buffer.from(signature, "base64"),
        payload
      );
      if (!authenticationResult.success) {
        throw new Error("Error during wallet authentication.");
      }
      const { userSignature, signedPayload } = authenticationResult;
      const authenticationPayload = {
        userSignature,
        signedPayload,
      };
      const user = await this.serverAuthenticate(authenticationPayload);
      return { user };
    } catch (e) {
      return { errorMessage: (e as Error).message };
    }
  }
}
