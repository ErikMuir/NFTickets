import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import { toFriendlyDateTime } from "@/common-utils/dates";
import { Card } from "@/components/common/Card";
import Loading from "@/components/views/Loading";
import useEvents from "@/lib/useEvents";
import { Hidable } from "@/components/componentTypes";
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

export const Events = ({ isHidden }: Hidable): ReactElement => {
  const { data: events, isLoading } = useEvents();

  const getContent = (): ReactElement => {
    if (isLoading) return <Loading />;

    if (!events?.length) return <div className="text-md italic">No events</div>;

    return (
      <div className="flex flex-wrap items-start gap-8">
        {sortEvents(events).map(
          ({
            address,
            venue,
            entertainer,
            dateTime,
            preSales,
            postSales,
            pastEvent,
          }) => {
            let overlayText: string | undefined;
            if (pastEvent) {
              overlayText = "Past Event";
            } else if (preSales) {
              overlayText = "Pre Sales";
            } else if (postSales) {
              overlayText = "Sales Ended";
            }
            return (
              <Card
                key={address}
                title={entertainer.name}
                subtitle={`${venue.name} | ${venue.city}, ${venue.state}`}
                description={toFriendlyDateTime(dateTime)}
                imageUrl={entertainer.imageUrl}
                overlayText={overlayText}
              />
            );
          }
        )}
      </div>
    );
  };

  return <div className={twMerge(isHidden && "hidden")}>{getContent()}</div>;
};
