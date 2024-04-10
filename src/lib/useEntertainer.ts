"use client";

import useSWR from "swr";

import { fetchStandardJson } from "./fetch-json";
import { Entertainer } from "@/models";

export default function useEntertainer(accountId: string) {
  return useSWR<Entertainer>(`/api/entertainers/${accountId}`, fetchStandardJson);
}
