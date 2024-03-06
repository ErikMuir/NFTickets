"use client";

import useSWR from "swr";

import { fetchJson } from "./fetch-json";
import { Venue } from "@/models";

export default function useVenues() {
  return useSWR<Venue[]>("/api/venues", fetchJson);
}
