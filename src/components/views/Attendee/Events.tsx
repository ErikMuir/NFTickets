import { ReactElement } from "react";
import { toFriendlyDateTime } from "@/common-utils/dates";
import { Card } from "@/components/common/Card";
import Loading from "@/components/views/Loading";
import useEvents from "@/lib/useEvents";

export const Events = (): ReactElement => {
  const { data: events, isLoading } = useEvents();

  const getContent = (): ReactElement => {
    if (isLoading) return <Loading />;

    if (!events?.length) return <div className="text-md italic">No events</div>;

    return (
      <div className="flex flex-wrap items-start gap-8">
        {events.map(({ address, venue, entertainer, dateTime }) => (
          <Card
            key={address}
            title={entertainer.name}
            subtitle={`${venue.name} | ${venue.city}, ${venue.state}`}
            description={toFriendlyDateTime(dateTime)}
            imageUrl={entertainer.imageUrl}
          />
        ))}
      </div>
    );
  };

  return <div>{getContent()}</div>;
};
