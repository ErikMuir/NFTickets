import { NextApiRequest, NextApiResponse } from "next/types";
import { withIronSessionApiRoute } from "iron-session/next";

import { User } from "@/lib/user/types";
import { ironSessionOptions } from "@/lib/user/session";

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    res.status(200).json({
      ...req.session.user,
    });
  } else {
    res.status(200).json({
      isLoggedIn: false,
    });
  }
}

export default withIronSessionApiRoute(userRoute, ironSessionOptions);
