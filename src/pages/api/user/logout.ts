import { NextApiRequest, NextApiResponse } from "next/types";

import { withStandardApi } from "@/server-utils/api-wrappers";
import { StandardPayload } from "@/server-utils/api-responses";

function logoutRoute(req: NextApiRequest, res: NextApiResponse<StandardPayload<void>>) {
  req.session.destroy();
  res.status(200).json({ ok: true, data: void(0) });
}

export default withStandardApi(logoutRoute, { public: true });
