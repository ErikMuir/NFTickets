"use client";

import useSWR from "swr";

import { fetchStandardJson } from "./fetch-json";
import { EventDto, mapEventFromApi } from "@/models";

export type EventFilterProps = {
  venue?: string;
  entertainer?: string;
};

export default function useEvents({
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

  return {
    ...swrResponse,
    data: swrResponse.data
      ?.filter((ev) => ev.finalized)
      .map(mapEventFromApi),
  };
}
