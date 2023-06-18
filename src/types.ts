export enum Network {
  Mainnet = "mainnet",
  Testnet = "testnet",
}

export type User = {
  isLoggedIn: boolean;
  initToken?: string;
  network?: Network;
  accountId?: string;
  hashconnectTopic?: string;
};

export type LoggedInUser = Omit<
  User,
  "isLoggeedIn" | "accountId" | "network" | "hashconnectTopic"
> & {
  isLoggedIn: true;
  accountId: string;
  network: Network;
  hashconnectTopic: string;
};

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
