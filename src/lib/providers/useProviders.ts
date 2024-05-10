"use client";

import useSWR from "swr";
import { fetchStandardJson } from "../fetch-json";
import { Entertainer, Role, Venue } from "@/models";

export default function useProviders(role: Role) {
  return useSWR<Entertainer[] | Venue[]>(`/api/${role}s`, fetchStandardJson);
}
