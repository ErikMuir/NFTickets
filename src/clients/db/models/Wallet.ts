import { Role } from "../types";
import { BaseModel } from "./base-model";

export type Wallet = BaseModel & {
  address: string;
  role?: Role;
};
