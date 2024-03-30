import { EventDto } from "@/models";

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
