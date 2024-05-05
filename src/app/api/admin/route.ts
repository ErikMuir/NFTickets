import { NextRequest, NextResponse } from "next/server";
import { up, down, reset, seed, adHoc, setRole } from "./actions";
import { Actions } from "./types";
import { authorizeAdmin } from "@/server-utils/authorize-admin";
import { BadRequestError, ForbiddenError } from "@/server-utils/api-errors";
import { lookup } from "@/common-utils/enums";
import { Role } from "@/models";

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
      case Actions.SET_ROLE: {
        const account = searchParams.get("account");
        if (!account) throw new BadRequestError("Account is required.");

        const roleParam = searchParams.get("role");
        const role = lookup(Role, `${roleParam || Role.ATTENDEE}`);
        if (!role) throw new BadRequestError(`Unsupported role: '${roleParam}'.`);

        const name = searchParams.get("name");
        if (!name) throw new BadRequestError("Name is required.");

        return await setRole(account, role, name);
      }
      case Actions.AD_HOC:
        return await adHoc();
      case Actions.NONE:
        throw new BadRequestError("Action not provided.");
      default:
        throw new BadRequestError(`Unknown action: '${action}'.`);
    }
  } catch (error) {
    console.log(error);
    const { message = "Unknown error occurred." } = error as Error;
    const status =
      error instanceof ForbiddenError
        ? 403
        : error instanceof BadRequestError
          ? 400
          : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
