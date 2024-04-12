"use client";

import useSWR from "swr";

import { fetchStandardJson } from "./fetch-json";
import { Entertainer } from "@/models";

export default function useEntertainer(account: string) {
  return useSWR<Entertainer>(`/api/entertainers/${account}`, fetchStandardJson);
}
