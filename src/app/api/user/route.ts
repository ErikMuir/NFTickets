import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { getIronSession } from "iron-session";

import { User } from "@/lib/user/types";
import { sessionOptions } from "@/lib/user/session";
import { success } from "@/server-utils/api-responses";

export async function GET(_: NextRequest) {
  const user = await getIronSession<User>(cookies(), sessionOptions);
  return user ? success(user) : success({ isLoggedIn: false });
}
