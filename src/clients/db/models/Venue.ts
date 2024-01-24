import { BaseModel } from "./base-model";

export type Venue = BaseModel & {
  walletId: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  sections?: Record<string, number>;
};
