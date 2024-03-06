"use client";

import useSWR from "swr";

import { fetchJson } from "./fetch-json";
import { Entertainer } from "@/models";

export default function useEntertainers() {
  return useSWR<Entertainer[]>("/api/entertainers", fetchJson);
}
