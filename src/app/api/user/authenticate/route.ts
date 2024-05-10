import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { PublicKey } from "@hashgraph/sdk";
import { getIronSession } from "iron-session";
import invariant from "tiny-invariant";
import { getHederaSigningService } from "@/clients/hedera/signing-service";
import { getAccountInfo } from "@/clients/mirror";
import { toUint8Array } from "@/utils/common/arrays";
import { badRequest, forbidden, success } from "@/utils/server/api-responses";
import {
  errorResponse,
  methodNotAllowed,
  unauthenticated,
} from "@/utils/server/api-responses";
import { Network } from "@/clients/hedera/types";
import { sessionOptions } from "@/lib/user/session";
import { HashconnectAuthenticationRequest } from "@/lib/hashconnect/types";
import { getWallet, insertWallet } from "@/clients/db";
import { Role } from "@/models";
import { User } from "@/lib/user/types";

export async function POST(req: NextRequest) {
  const user = await getIronSession<User>(cookies(), sessionOptions);

  if (req.method !== "POST") {
    return methodNotAllowed();
  }
  if (!user?.hashconnectTopic) {
    console.log("No hashconnect session found.");
    return unauthenticated();
  }
  if (!user.initToken) {
    console.log("No token found on session.");
    return unauthenticated();
  }

  const { initToken, accountId, network } = user;
  const { userSignature, signedPayload } =
    (await req.json()) as HashconnectAuthenticationRequest;

  if (!userSignature || !signedPayload) {
    return badRequest("userSignature and signedPayload are required.");
  }

  if (network !== Network.Testnet) {
    return badRequest("network should be testnet");
  }

  if (signedPayload.originalPayload.data.token !== initToken) {
    return forbidden("signedPayload does not match session");
  }

  const hederaSigningService = await getHederaSigningService();

  const serverKeyVerified = hederaSigningService.verifyData(
    signedPayload.originalPayload,
    hederaSigningService.publicKey,
    toUint8Array(signedPayload.serverSignature)
  );

  if (!serverKeyVerified) {
    console.log("Could not verify server signature");
    return unauthenticated();
  }

  let publicKey: PublicKey;
  try {
    invariant(accountId);
    const accountResponse = await getAccountInfo(accountId);

    if (!accountResponse.key?.key) {
      console.log(`Failed to find public key for account: ${accountId}`);
      return unauthenticated();
    }
    publicKey = PublicKey.fromString(accountResponse.key.key);
  } catch (err) {
    return errorResponse(`Could not find account ${accountId}.`, 503);
  }

  const userKeyVerified = hederaSigningService.verifyData(
    signedPayload,
    publicKey,
    toUint8Array(userSignature)
  );

  if (!userKeyVerified) {
    return unauthenticated();
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

  user.isLoggedIn = true;
  user.role = role;
  await user.save();

  return success(user);
}
