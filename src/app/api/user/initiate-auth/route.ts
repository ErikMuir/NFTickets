import { randomUUID } from "crypto";
import { getIronSession } from "iron-session";
import { getHederaSigningService } from "@/clients/hedera/signing-service";
import {
  badRequest,
  methodNotAllowed,
  success,
} from "@/server-utils/api-responses";
import { Network } from "@/clients/hedera/types";
import { HashconnectInitiateAuthRequest } from "@/lib/hashconnect/types";
import { sessionOptions } from "@/lib/user/session";
import { User } from "@/lib/user/types";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return methodNotAllowed();
  }

  const { topic, accountId, network } =
    (await req.json()) as HashconnectInitiateAuthRequest;

  if (!topic || !accountId) {
    return badRequest("topic and accountId are required.");
  }
  if (network !== Network.Testnet) {
    return badRequest("network should be testnet");
  }

  const token = randomUUID();
  const payload = {
    url: "https://nftickets-beta.vercel.app",
    data: { token, date: Date.now() },
  };

  const hederaSigningService = await getHederaSigningService();

  const signedPayload = hederaSigningService.signData(payload);

  const user = await getIronSession<User>(cookies(), sessionOptions);
  user.initToken = token;
  user.hashconnectTopic = topic;
  user.accountId = accountId;
  user.network = network;
  await user.save();

  return success({ ...signedPayload, payload });
}
