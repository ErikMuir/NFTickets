import { randomUUID } from "crypto";
import { getHederaSigningService } from "@/server-utils/hedera-signing-service";
import {
  errorResponse,
  methodNotAllowed,
  StandardPayload,
  success,
} from "@/server-utils/api-responses";
import {
  HashconnectInitiateAuthRequest,
  HashconnectInitiateAuthResult,
  Network,
} from "@/types";
import { withStandardApi } from "@/server-utils/api-wrappers";
import { NextApiRequest, NextApiResponse } from "next/types";

async function initiateAuthRoute(
  req: NextApiRequest,
  res: NextApiResponse<StandardPayload<HashconnectInitiateAuthResult>>
) {
  if (req.method !== "POST") {
    return methodNotAllowed(res);
  }

  const { topic, accountId, network } = req.body as HashconnectInitiateAuthRequest;

  if (!topic || !accountId) {
    return errorResponse(res, 400, "topic and accountId are required.");
  }
  if (network !== Network.Testnet) {
    return errorResponse(res, 400, "network should be testnet");
  }

  const token = randomUUID();
  const payload = {
    url: "https://nftickets-beta.vercel.app",
    data: { token, date: Date.now() },
  };

  const hederaSigningService = await getHederaSigningService();

  const signedPayload = hederaSigningService.signData(payload);

  req.session.user = {
    isLoggedIn: false,
    initToken: token,
    accountId,
    network,
    hashconnectTopic: topic,
  };
  await req.session.save();
  return success(res, { ...signedPayload, payload });
}

export default withStandardApi(initiateAuthRoute, { public: true });
