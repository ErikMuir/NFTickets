import { Network } from "@/clients/hedera/types";
import { Role } from "@/models";

export type User = {
  isLoggedIn: boolean;
  initToken?: string;
  network?: Network;
  accountId?: string;
  hashconnectTopic?: string;
  role?: Role;
};

export type LoggedInUser = Omit<
  User,
  "isLoggeedIn" | "accountId" | "network" | "hashconnectTopic" | "role"
> & {
  isLoggedIn: true;
  accountId: string;
  network: Network;
  hashconnectTopic: string;
  role: Role;
};
