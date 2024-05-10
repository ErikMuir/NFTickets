import { NextRequest, NextResponse } from "next/server";
import {
  getAllEvents,
  getEventsByEntertainer,
  getEventsByVenue,
} from "@/clients/db/events";
import { EventDto, Role } from "@/models";
import {
  StandardPayload,
  badRequest,
  serverError,
  success,
} from "@/utils/server/api-responses";
import { lookup } from "@/utils/common/enums";
import { getIronSession } from "iron-session";
import { LoggedInUser, User } from "@/lib/user/types";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/user/session";

export async function GET(
  request: NextRequest
): Promise<NextResponse<StandardPayload<EventDto[] | string>>> {
  const { searchParams } = request.nextUrl;
  const role = lookup(Role, searchParams.get("role") || Role.ATTENDEE);
  const account = searchParams.get("account");
  switch (role) {
    case Role.ATTENDEE:
      return success(await getAllEvents());
    case Role.ENTERTAINER:
      return account
        ? success(await getEventsByEntertainer(account))
        : badRequest("Account is required when filtering by entertainer.");
    case Role.VENUE:
      return account
        ? success(await getEventsByVenue(account))
        : badRequest("Account is required when filtering by venue.");
    default:
      return badRequest(`Unsupported role: '${role}'.`);
  }
}

export type CreateEventRequest = {
  partnerRole: Role;
  partner: string;
};

export async function POST(
  request: NextRequest
): Promise<NextResponse<StandardPayload<{}>>> {
  const { partnerRole, partner } = (await request.json()) as CreateEventRequest;
  const user = await getIronSession<LoggedInUser>(cookies(), sessionOptions);
  const { role: providerRole, accountId: provider } = user;

  return serverError("Not implemented.");
}
