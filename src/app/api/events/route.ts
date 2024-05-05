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
  success,
} from "@/server-utils/api-responses";
import { lookup } from "@/common-utils/enums";

export async function GET(
  request: NextRequest
): Promise<NextResponse<StandardPayload<EventDto[] | string>>> {
  const { searchParams } = request.nextUrl;
  console.log("GET /api/events", searchParams);
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
