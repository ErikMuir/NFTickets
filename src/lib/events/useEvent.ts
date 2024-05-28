"use client";

import useSWR from "swr";

import { fetchStandardJson } from "../fetch-json";
import { EventDto } from "@/models";

export default function useEvent(eventAddress: string) {
  return useSWR<EventDto>(
    `/api/events/${eventAddress}`,
    fetchStandardJson
  );
}
