import { EventDto, Role, mapEventFromApi } from "@/models";

export enum EventCategory {
  PAST_EVENTS = "Past Events",
  UNFINALIZED_EVENTS = "Unfinalized Events",
  UPCOMING_EVENTS = "Upcoming Events",
}

export type CategorizedEventsModel = {
  past: EventDto[];
  unfinalized: EventDto[];
  upcoming: EventDto[];
};

export class CategorizedEvents {
  private events: EventDto[];
  private role: Role;
  private past: EventDto[] = [];
  private unfinalized: EventDto[] = [];
  private upcoming: EventDto[] = [];

  constructor(events?: EventDto[], role?: Role) {
    this.events = events || [];
    this.role = role || Role.ATTENDEE;
    this.categorize();
  }

  public get value(): CategorizedEventsModel {
    return {
      past: this.past,
      unfinalized: this.unfinalized,
      upcoming: this.upcoming,
    };
  }

  private categorize() {
    this.events.forEach((event) => {
      const mappedEvent = mapEventFromApi(event);
      if (!mappedEvent.finalized && this.role !== Role.ATTENDEE) {
        this.unfinalized.push(mappedEvent);
      } else if (mappedEvent.pastEvent) {
        this.past.push(mappedEvent);
      } else {
        this.upcoming.push(mappedEvent);
      }
    });
  }
}

export const sortEvents = (events: EventDto[] = []): EventDto[] => {
  const preSalesEvents: EventDto[] = [];
  const activeSalesEvents: EventDto[] = [];
  const postSalesEvents: EventDto[] = [];
  const pastEvents: EventDto[] = [];

  events.forEach((e: EventDto) => {
    if (e.preSales) preSalesEvents.push({ ...e });
    else if (e.pastEvent) pastEvents.push({ ...e });
    else if (e.postSales) postSalesEvents.push({ ...e });
    else activeSalesEvents.push({ ...e });
  });

  return [
    ...activeSalesEvents,
    ...postSalesEvents,
    ...preSalesEvents,
    ...pastEvents,
  ];
};
