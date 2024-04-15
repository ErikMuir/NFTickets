import {
  getAllEvents,
  getEventsByEntertainer,
  getEventsByVenue,
} from "@/clients/db/events";
import { EventDto } from "@/models";
import { success } from "@/server-utils/api-responses";

export type GetEventsParams = {
  entertainer?: string;
  venue?: string;
};

export async function GET(_: Request, { params = {} }: { params: GetEventsParams }) {
  let events: EventDto[];
  if (params.entertainer) {
    events = await getEventsByEntertainer(params.entertainer);
  } else if (params.venue) {
    events = await getEventsByVenue(params.venue);
  } else {
    events = await getAllEvents();
  }
  return success(events);
}
