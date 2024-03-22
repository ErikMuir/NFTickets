"use client";

import useSWR from "swr";

import { User } from "@/lib/user/types";
import { fetchStandardJson } from "../fetch-json";

export default function useUser() {
  return useSWR<User>("/api/user", fetchStandardJson);
}
