"use client";

import useSWR from "swr";

import { fetchStandardJson } from "../fetch-json";
import { EventDto } from "@/models";
import {
  RoleAccountFilter,
  queryStringFromRoleAccountFilter,
} from "../role-account-filter";
import { CategorizedEvents } from "./event-helpers";

export default function useEvents(filter: RoleAccountFilter = {}) {
  const swrResponse = useSWR<EventDto[]>(
    `/api/events?${queryStringFromRoleAccountFilter(filter)}`,
    fetchStandardJson
  );
  return {
    data: new CategorizedEvents(swrResponse.data, filter.role).value,
    isLoading: swrResponse.isLoading,
    error: swrResponse.error,
  };
}
