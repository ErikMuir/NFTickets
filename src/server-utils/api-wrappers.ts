import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import {
  errorResponse,
  StandardPayload,
  unauthenticated,
} from "@/server-utils/api-responses";
import { RequestError } from "@/server-utils/api-errors";
import { ironSessionOptions } from "@/lib/user/session";

export function withStandardApi<T = any>(
  handler: NextApiHandler<StandardPayload<T>>,
  options: { public?: boolean; noSession?: boolean } = {}
): NextApiHandler<StandardPayload<T>> {
  const wrappedHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<StandardPayload<T>>
  ) => {
    try {
      const authorized =
        options.public ||
        (req.session.user?.isLoggedIn === true && req.session.user.accountId);
      if (!authorized) {
        console.log("Not authenticated.");
        return unauthenticated(res);
      }
      await handler(req, res);
    } catch (e) {
      if (e instanceof RequestError) {
        console.log(e, "Request error occurred.");
        return e.toErrorResponse(res);
      } else {
        console.log(e, "Unknown error occurred.");
        return errorResponse(res, 500, "Unknown error occurred");
      }
    }
  };

  if (!options.noSession) {
    return withIronSessionApiRoute(wrappedHandler, ironSessionOptions);
  }
  return wrappedHandler;
}
