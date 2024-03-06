import { ReactElement } from "react";
import useEntertainers from "@/lib/useEntertainers";
import useEvents from "@/lib/useEvents";
import useVenues from "@/lib/useVenues";
import { Entertainer, Event, Venue } from "@/models";
import { CircularProgress } from "@mui/material";

const Entertainers = (entertainers: Entertainer[] | undefined, isLoading: boolean): ReactElement => {
  if (isLoading) return <CircularProgress size="1.5rem" />;
  if (!entertainers?.length) return <div className="text-md italic">No entertainers</div>;
  const nodeList = entertainers.map(entertainer => (
    <div key={entertainer.account}>
      <div className="text-xl">{entertainer.name}</div>
      {entertainer.iteration?.length && (
        <div className="text-md">{entertainer.iteration}</div>
      )}
      {entertainer.description?.length && (
        <div className="text-sm">{entertainer.description}</div>
      )}
    </div>
  ));
  return <div className="flex flex-wrap items-center gap-8">{nodeList}</div>
};

const Venues = (venues: Venue[] | undefined, isLoading: boolean): ReactElement => {
  if (isLoading) return <CircularProgress size="1.5rem" />;
  if (!venues?.length) return <div className="text-md italic">No venues</div>;
  const nodeList = venues.map(venue => (
    <div key={venue.account}>
      <div className="text-xl">{venue.name}</div>
      {venue.location?.length && (
        <div className="text-md">{venue.location}</div>
      )}
      {venue.description?.length && (
        <div className="text-sm">{venue.description}</div>
      )}
    </div>
  ));
  return <div className="flex flex-wrap items-center gap-8">{nodeList}</div>
};

const Events = (events: Event[] | undefined, isLoading: boolean): ReactElement => {
  if (isLoading) return <CircularProgress size="1.5rem" />;
  if (!events?.length) return <div className="text-md italic">No events</div>;
  const nodeList = events.map(event => (
    <div key={event.address}>
      <div className="text-xl">{event.entertainer}</div>
    </div>
  ));
  return <div className="flex flex-wrap items-center gap-8">{nodeList}</div>
};

export default function Attendee(): ReactElement {
  const { data: entertainers, isLoading: isEntertainersLoading } = useEntertainers();
  const { data: venues, isLoading: isVenuesLoading } = useVenues();
  const { data: events, isLoading: isEventsLoading } = useEvents();

  return (
    <div className="flex flex-col m-8 gap-12">
      <div className="flex flex-col items-start">
        <div className="text-2xl font-bold">Entertainers</div>
        {Entertainers(entertainers, isEntertainersLoading)}
      </div>
      <div>
        <div className="text-2xl font-bold">Venues</div>
        {Venues(venues, isVenuesLoading)}
      </div>
      <div>
        <div className="text-2xl font-bold">Events</div>
        {Events(events, isEventsLoading)}
      </div>
    </div>
  );
}
