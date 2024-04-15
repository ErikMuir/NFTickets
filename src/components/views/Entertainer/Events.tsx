import { toFriendlyDateTime } from "@/common-utils/dates";
import { Card } from "@/components/common/Card";
import { Loading } from "@/components/common/Loading";
import { EventDto } from "@/models";
import { EventCategory } from "@/models/Event";
import { twMerge } from "tailwind-merge";

export type EntertainerEventsProps = {
  tab: EventCategory;
  currentTab: string;
  isLoading?: boolean;
  events: EventDto[];
};

export default function EntertainerEvents({
  tab,
  currentTab,
  isLoading,
  events,
}: EntertainerEventsProps) {
  const getContent = () => {
    if (isLoading) return <Loading />;

    if (!events.length) return <div className="text-md italic">No {tab}</div>;

    return (
      <div className="flex flex-wrap items-start gap-8">
        {events.map(({ address, venue, dateTime }) => (
          <Card
            key={address}
            title={venue.name}
            subtitle={`${venue.city}, ${venue.state}`}
            description={toFriendlyDateTime(dateTime)}
            imageUrl={venue.imageUrl}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={twMerge(currentTab !== tab && "hidden")}>
      {getContent()}
    </div>
  );
}
