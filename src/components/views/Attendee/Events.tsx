import { ReactElement } from "react";
import { CircularProgress } from "@mui/material";
import useEvents from "@/lib/useEvents";
import { Card } from "@/components/common/Card";
import { toFriendlyDateTime } from "@/common-utils/dates";

export const Events = (): ReactElement => {
  const { data: events, isLoading } = useEvents();

  const getContent = (): ReactElement => {
    if (isLoading) return <CircularProgress size="1.5rem" />;

    if (!events?.length)
      return <div className="text-md italic">No entertainers</div>;

    return (
      <div className="flex flex-wrap items-start gap-8">
        {events.map(({ address, entertainerName, venueName, dateTime, imageUrl }) => (
          <Card
            key={address}
            title={entertainerName}
            subtitle={venueName}
            description={toFriendlyDateTime(dateTime)}
            imageUrl={imageUrl}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* <div className="text-sm uppercase mb-1">Events</div> */}
      {getContent()}
    </div>
  );
};
