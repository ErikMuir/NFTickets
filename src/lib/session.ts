import type { IronSessionOptions } from "iron-session";
import { User } from "@/types";

export const ironSessionOptions: IronSessionOptions = {
  password: "2a552d2e-17f9-495c-81a9-daae9d7e6c7c",
  cookieName: `nftickets/session`,
  cookieOptions: {
    secure: false,
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
