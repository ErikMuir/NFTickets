"use client";

import useSWR from "swr";

import { fetchStandardJson } from "./fetch-json";
import { EventDto, mapEventFromApi } from "@/models";

export default function useEvents(includePending = false) {
  const swrResponse = useSWR<EventDto[]>("/api/events", fetchStandardJson);
  return {
    ...swrResponse,
    data: swrResponse.data
      ?.filter((ev) => includePending || ev.finalized)
      .map(mapEventFromApi),
  };
}
