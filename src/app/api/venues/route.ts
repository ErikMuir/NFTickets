import { getAllVenues } from "@/clients/db/venues";
import { success } from "@/server-utils/api-responses";

export async function GET(_: Request) {
  const venues = await getAllVenues();
  return success(venues);
}
