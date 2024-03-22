import { getAllEvents } from "@/clients/db/events";
import { success } from "@/server-utils/api-responses";

export async function GET(_: Request) {
  const events = await getAllEvents();
  return success(events);
}
