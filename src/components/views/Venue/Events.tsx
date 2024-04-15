import { toFriendlyDateTime } from "@/common-utils/dates";
import { Card } from "@/components/common/Card";
import { Loading } from "@/components/common/Loading";
import { EventDto } from "@/models";
import { EventCategory } from "@/models/Event";
import { twMerge } from "tailwind-merge";

export type VenueEventsProps = {
  tab: EventCategory;
  currentTab: string;
  isLoading?: boolean;
  events: EventDto[];
};

export default function VenueEvents({
  tab,
  currentTab,
  isLoading,
  events,
}: VenueEventsProps) {
  const getContent = () => {
    if (isLoading) return <Loading />;

    if (!events.length) return <div className="text-md italic">No {tab}</div>;

    return (
      <div className="flex flex-wrap items-start gap-8">
        {events.map(({ address, entertainer, dateTime }) => (
          <Card
            key={address}
            title={entertainer.name}
            description={toFriendlyDateTime(dateTime)}
            imageUrl={entertainer.imageUrl}
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
