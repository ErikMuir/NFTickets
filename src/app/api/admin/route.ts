import { NextRequest, NextResponse } from "next/server";
import { up, down, reset, seed, adHoc } from "./actions";
import { Actions } from "./types";
import { authorizeAdmin } from "@/server-utils/authorize-admin";
import { ForbiddenError } from "@/server-utils/api-errors";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = request.nextUrl;

  const action = searchParams.get("action") || "";

  try {
    authorizeAdmin(request);
    switch (action) {
      case Actions.UP:
        return await up();
      case Actions.DOWN:
        return await down();
      case Actions.RESET:
        return await reset();
      case Actions.SEED:
        return await seed();
      case Actions.AD_HOC:
        return await adHoc();
      case Actions.NONE:
        return NextResponse.json(
          { error: "action not provided" },
          { status: 400 }
        );
      default:
        return NextResponse.json(
          { error: `unknown action: '${action}'` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.log(error);
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error }, { status: 403 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}
