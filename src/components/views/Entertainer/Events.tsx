import { twMerge } from "tailwind-merge";
import { toFriendlyDateTime } from "@/common-utils/dates";
import { Loading } from "@/components/common/Loading";
import { Card } from "@/components/common/Card";
import { EventsTabProps } from "@/components/component-types";

export default function EntertainerEvents({
  tab,
  currentTab,
  isLoading,
  events,
}: EventsTabProps) {
  return (
    <div className={twMerge(currentTab !== tab && "hidden")}>
      {isLoading ? (
        <Loading />
      ) : events.length === 0 ? (
        <div className="text-md italic">No {tab}</div>
      ) : (
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
      )}
    </div>
  );
}
