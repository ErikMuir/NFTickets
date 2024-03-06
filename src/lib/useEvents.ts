"use client";

import useSWR from "swr";

import { fetchJson } from "./fetch-json";
import { Event } from "@/models";

export default function useEvents() {
  return useSWR<Event[]>("/api/events", fetchJson);
}
