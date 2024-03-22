"use client";

import useSWR from "swr";

import { fetchStandardJson } from "./fetch-json";
import { EventDto } from "@/models";

export default function useEvents() {
  return useSWR<EventDto[]>("/api/events", fetchStandardJson);
}
