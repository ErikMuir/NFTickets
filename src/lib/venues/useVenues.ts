"use client";

import useSWR from "swr";

import { fetchStandardJson } from "../fetch-json";
import { Venue } from "@/models";

export default function useVenues() {
  return useSWR<Venue[]>("/api/venues", fetchStandardJson);
}
