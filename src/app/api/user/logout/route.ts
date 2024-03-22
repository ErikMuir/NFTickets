import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

import { success } from "@/server-utils/api-responses";
import { sessionOptions } from "@/lib/user/session";

export async function GET(req: NextRequest) {
  const session = await getIronSession(cookies(), sessionOptions);
  session.destroy();
  return success(void 0);
}
