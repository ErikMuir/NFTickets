"use client";

import useSWR from "swr";

import { fetchStandardJson } from "../fetch-json";
import { Venue } from "@/models";

export default function useVenue(account: string) {
  return useSWR<Venue>(`/api/venues/${account}`, fetchStandardJson);
}
