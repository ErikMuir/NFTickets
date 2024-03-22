import { Network } from "@/clients/hedera/types";
import { Role } from "@/models";

export type LoggedOutUser = {
  isLoggedIn: false;
  initToken?: string;
  accountId?: string;
  network?: Network;
  hashconnectTopic?: string;
  role?: Role;
};

export type LoggedInUser = {
  isLoggedIn: true;
  initToken?: string;
  accountId: string;
  network: Network;
  hashconnectTopic: string;
  role: Role;
};

export type User = LoggedOutUser | LoggedInUser;
