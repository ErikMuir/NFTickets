import { NextRequest, NextResponse } from "next/server";
import { down, insert, remove, up } from "./actions";
import { Actions } from "./types";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = request.nextUrl;

  const action = searchParams.get("action") || "";
  const table = searchParams.get("table") || "";
  const address = searchParams.get("address") || "";

  try {
    switch (action) {
      case Actions.UP:
        return await up();
      case Actions.DOWN:
        return await down();
      case Actions.INSERT:
        return await insert(table, address);
      case Actions.DELETE:
        return await remove(table, address);
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
    return NextResponse.json({ error }, { status: 500 });
  }
}
