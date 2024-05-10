"use client";

import useSWR from "swr";
import { fetchStandardJson } from "../fetch-json";
import { SelectValue } from "@/components/component-types";
import { Entertainer, Role, Venue } from "@/models";

export default function usePartnerOptions(role: Role) {
  const { data, isLoading, error } = useSWR<Entertainer[] | Venue[]>(
    `/api/${role}s`,
    fetchStandardJson
  );
  const partnerOptions: Record<string, SelectValue> = {};
  data?.forEach(({ account, name }) => {
    partnerOptions[account] = `${name} [${account}]`;
  });
  return { data: partnerOptions, partnerOptions, isLoading, error };
}
