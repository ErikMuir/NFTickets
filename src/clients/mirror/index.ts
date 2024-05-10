import { getRequired } from "../../utils/common/env";
import { fetchJson } from "@/lib/fetch-json";
import { AccountInfo } from "@/clients/mirror/types";

export const callMirror = async <T>(path: string): Promise<T> => {
  return fetchJson<T>(`${getRequired("MIRROR_API_URL")}/${path}`, {
    method: "GET",
    headers: {
      "x-api-key": getRequired("MIRROR_API_KEY"),
    },
  });
};

export const getAccountInfo = async (
  accountId: string
): Promise<AccountInfo> => {
  return callMirror<AccountInfo>(`/accounts/${accountId}`);
};
