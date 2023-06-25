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

export type Seat = string;

export type Row = Seat[];

export type ReservedSection = Record<string, Row>;

export type Venue = {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  openSections?: Record<string, number>;
  reservedSections?: Record<string, ReservedSection>;
};

export enum EntertainerType {
  Unknown = "N/A",
  Music = "Music",
  Sports = "Sports",
  Comedy = "Comedy",
}

export type Entertainer = {
  name: string;
  type: EntertainerType;
  description: string;
  currentIteration: string;
};

export type Event = {
  venue: string;
  entertainer: string;
  dateTime: Date;
  ticketSalesBegin: Date;
  ticketSalesEnd: Date;
};
