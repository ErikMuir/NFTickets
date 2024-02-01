import { lookup } from "@/common-utils/enums";

export enum Role {
  ATTENDEE = "attendee",
  ENTERTAINER = "entertainer",
  VENUE = "venue",
}

export type Wallet = {
  account: string;
  role: Role;
};

export const mapWallet = ({ account, role }: any): Wallet => ({
  account,
  role: lookup(Role, role) ?? Role.ATTENDEE,
});
