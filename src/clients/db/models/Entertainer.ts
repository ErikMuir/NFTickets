import { EntertainerType } from "../types";
import { BaseModel } from "./base-model";

export type Entertainer = BaseModel & {
  walletId: string;
  type: EntertainerType;
  name: string;
  description?: string;
  iteration?: string;
};
