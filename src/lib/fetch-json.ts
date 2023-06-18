import { StandardPayload } from "./api-responses";

export const fetchJson = async <T>(
  url: string,
  init?: RequestInit | undefined
): Promise<T> => {
  const response = await fetchStandardJson<T>(url, init);
  if (!response.ok) throw new Error(response.error);
  return response.data;
};

export const fetchStandardJson = async <T>(
  url: string,
  init?: RequestInit | undefined
): Promise<StandardPayload<T>> => {
  return fetch(url, init).then((res) => res.json());
};
