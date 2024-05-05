import { ReactElement, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { toFriendlyDateTime } from "@/common-utils/dates";
import { Card } from "@/components/common/Card";
import { Loading } from "@/components/common/Loading";
import { Hidable } from "@/components/component-types";
import useEvents from "@/lib/useEvents";
import { sortEvents } from "@/lib/events/event-helpers";
import { EventDto } from "@/models";

export const Events = ({ isHidden }: Hidable): ReactElement => {
  const [events, setEvents] = useState<EventDto[]>([]);

  const {
    data: { past, upcoming },
    isLoading,
  } = useEvents();

  useEffect(() => {
    setEvents(sortEvents([...past, ...upcoming]));
  }, [past, upcoming]);

  return (
    <div className={twMerge(isHidden && "hidden")}>
      {isLoading ? (
        <Loading />
      ) : events.length === 0 ? (
        <div className="text-md italic">No events</div>
      ) : (
        <div className="flex flex-wrap items-start gap-8">
          {events.map(
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
      )}
    </div>
  );
};
