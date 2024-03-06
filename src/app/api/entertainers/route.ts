import { NextResponse } from "next/server";
import { getAllEntertainers } from "@/clients/db/entertainers";

export async function GET(request: Request) {
  try {
    const entertainers = await getAllEntertainers();
    return NextResponse.json(entertainers, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

// import { NextApiRequest, NextApiResponse } from "next/types";
// import { withIronSessionApiRoute } from "iron-session/next/dist";
// import { getAllEntertainers } from "@/clients/db/entertainers";
// import { ironSessionOptions } from "@/lib/user/session";
// import { Entertainer } from "@/models";
// import { StandardPayload, errorResponse, success } from "@/server-utils/api-responses";

// export async function entertainersRoute(
//   _req: NextApiRequest,
//   res: NextApiResponse<StandardPayload<Entertainer[]>>
// ) {
//   try {
//     const data = await getAllEntertainers();
//     return success(res, data);
//   } catch (error) {
//     console.log(error);
//     return errorResponse(res, 500, (error as Error).message);
//   }
// }

// export default withIronSessionApiRoute(entertainersRoute, ironSessionOptions);
