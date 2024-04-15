"use client";

import useSWR from "swr";

import { fetchStandardJson } from "./fetch-json";
import { EventDto, mapEventFromApi } from "@/models";
import { CategorizedEvents } from "@/models/Event";
import { EventFilterProps } from "./useEvents";

export default function useCategorizedEvents({
  venue,
  entertainer,
}: EventFilterProps = {}) {
  const params: Record<string, string> = {};
  if (venue) params["venue"] = venue;
  if (entertainer) params["entertainer"] = entertainer;

  const queryString = Object.entries(params)
    .filter(([key, value]) => key.length && value.length)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const swrResponse = useSWR<EventDto[]>(
    `/api/events?${queryString}`,
    fetchStandardJson
  );

  const categorizedEvents: CategorizedEvents = {
    unfinalized: [],
    upcoming: [],
    past: [],
  };

  swrResponse.data?.forEach((event) => {
    const mappedEvent = mapEventFromApi(event);
    if (!mappedEvent.finalized) categorizedEvents.unfinalized.push(mappedEvent);
    else if (!mappedEvent.pastEvent)
      categorizedEvents.upcoming.push(mappedEvent);
    else categorizedEvents.past.push(mappedEvent);
  });

  return {
    ...swrResponse,
    data: categorizedEvents,
  };
}
