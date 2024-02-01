import { PublicKey } from "@hashgraph/sdk";
import { NextApiRequest, NextApiResponse } from "next/types";
import invariant from "tiny-invariant";
import { getHederaSigningService } from "@/clients/hedera/signing-service";
import { getAccountInfo } from "@/clients/mirror";
import { toUint8Array } from "@/common-utils/arrays";
import {
  errorResponse,
  methodNotAllowed,
  StandardPayload,
  unauthenticated,
} from "@/server-utils/api-responses";
import { withStandardApi } from "@/server-utils/api-wrappers";
import { Network } from "@/clients/hedera/types";
import { LoggedInUser } from "@/lib/user/types";
import { HashconnectAuthenticationRequest } from "@/lib/hashconnect/types";
import { getWallet, insertWallet } from "@/clients/db";
import { Role } from "@/models";

async function authenticateRoute(
  req: NextApiRequest,
  res: NextApiResponse<StandardPayload<{ user: LoggedInUser }>>
) {
  if (req.method !== "POST") {
    return methodNotAllowed(res);
  }
  if (!req.session.user?.hashconnectTopic) {
    console.log("No hashconnect session found.");
    return unauthenticated(res);
  }
  if (!req.session.user.initToken) {
    console.log("No token found on session.");
    return unauthenticated(res);
  }

  const { initToken, accountId, network, hashconnectTopic } = req.session.user;
  const { userSignature, signedPayload } =
    req.body as HashconnectAuthenticationRequest;

  if (!userSignature || !signedPayload) {
    return errorResponse(
      res,
      400,
      "userSignature and signedPayload are required."
    );
  }

  if (network !== Network.Testnet) {
    return errorResponse(res, 400, "network should be testnet");
  }

  if (signedPayload.originalPayload.data.token !== initToken) {
    return errorResponse(res, 403, "signedPayload does not match session");
  }

  const hederaSigningService = await getHederaSigningService();

  const serverKeyVerified = hederaSigningService.verifyData(
    signedPayload.originalPayload,
    hederaSigningService.publicKey,
    toUint8Array(signedPayload.serverSignature)
  );

  if (!serverKeyVerified) {
    console.log("Could not verify server signature");
    return unauthenticated(res);
  }

  let publicKey: PublicKey;
  try {
    invariant(accountId);
    const accountResponse = await getAccountInfo(accountId);

    if (!accountResponse.key?.key) {
      console.log(`Failed to find public key for account: ${accountId}`);
      return unauthenticated(res);
    }
    publicKey = PublicKey.fromString(accountResponse.key.key);
  } catch (err) {
    return errorResponse(res, 503, `Could not find account ${accountId}.`);
  }

  const userKeyVerified = hederaSigningService.verifyData(
    signedPayload,
    publicKey,
    toUint8Array(userSignature)
  );

  if (!userKeyVerified) {
    return unauthenticated(res);
  }

  const wallet = await getWallet(accountId);
  const role = wallet?.role ?? Role.ATTENDEE;

  if (!wallet) {
    try {
      await insertWallet({
        account: accountId,
        role,
      });
    } catch (err) {
      console.log(err);
    }
  }

  const user: LoggedInUser = {
    isLoggedIn: true,
    accountId,
    network,
    hashconnectTopic,
    role,
  };

  req.session.user = user;
  await req.session.save();

  return res.status(200).json({
    ok: true,
    data: { user },
  });
}

export default withStandardApi(authenticateRoute, { public: true });
