import { Network } from "@/clients/hedera/types";

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
