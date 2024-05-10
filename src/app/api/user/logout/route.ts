import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

import { success } from "@/utils/server/api-responses";
import { sessionOptions } from "@/lib/user/session";

export async function POST(req: NextRequest) {
  const session = await getIronSession(cookies(), sessionOptions);
  session.destroy();
  return success(void 0);
}
