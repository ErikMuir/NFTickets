import { twMerge } from "tailwind-merge";
import { toFriendlyDateTime } from "@/utils/common/dates";
import { Card } from "@/components/common/Card";
import { Loading } from "@/components/common/Loading";
import { EventsTabProps } from "@/components/component-types";

export default function VenueEvents({
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
          {events.map(({ address, entertainer, dateTime }) => (
            <Card
              key={address}
              title={entertainer.name}
              description={toFriendlyDateTime(dateTime)}
              imageUrl={entertainer.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}
