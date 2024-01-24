import { HashConnectTypes } from "hashconnect";
import { Network } from "@/clients/hedera/types";
import { LoggedInUser } from "@/lib/user/types";

export type HashconnectConnectionData = HashConnectTypes.InitilizationData;

export type WithErrorMessage = {
  errorMessage?: string;
};

export type AuthenticationResult = WithErrorMessage & {
  user?: LoggedInUser;
};

export type ConnectionResult<ConnectionData> = WithErrorMessage & {
  connectionData?: ConnectionData;
};

export type DisconnectionResult = WithErrorMessage;

export type HashconnectInitiateAuthRequest = {
  topic: string;
  accountId: string;
  network: Network;
};

export type HashconnectAuthenticationPayload = {
  token: string;
  date: number;
};

export type HashconnectInitiateAuthResult = {
  signature: string;
  serverSigningAccount: string;
  payload: {
    url: string;
    data: HashconnectAuthenticationPayload;
  };
};

export type HashconnectAuthenticationRequest = {
  userSignature?: Uint8Array | string;
  signedPayload?: {
    serverSignature: Uint8Array | string;
    originalPayload: {
      url: string;
      data: HashconnectAuthenticationPayload;
    };
  };
};
