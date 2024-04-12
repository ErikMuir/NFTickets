import { getVenue, updateVenue } from "@/clients/db/venues";
import { Venue } from "@/models";
import { badRequest, success } from "@/server-utils/api-responses";

export async function GET(
  _: Request,
  { params }: { params: { account: string } }
) {
  const venue = await getVenue(params.account);
  return success(venue);
}

export async function PUT(
  request: Request,
  { params }: { params: { account: string } }
) {
  const venue = (await request.json()) as Venue;
  if (venue.account !== params.account) {
    return badRequest("Mismatched account id");
  }
  await updateVenue(venue);
  return success(venue);
}
