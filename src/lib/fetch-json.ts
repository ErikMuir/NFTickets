import { StandardPayload } from "../utils/server/api-responses";

export const fetchStandardJson = async <T>(
  url: string,
  init?: RequestInit | undefined
): Promise<T> => {
  const response = await fetchJson<StandardPayload<T>>(url, init);
  if (!response.ok) throw new Error(response.error);
  return response.data;
};

export const fetchJson = async <T>(
  url: string,
  init?: RequestInit | undefined
): Promise<T> => {
  return fetch(url, init).then((res) => res.json());
};
