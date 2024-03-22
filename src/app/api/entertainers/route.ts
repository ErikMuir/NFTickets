import { getAllEntertainers } from "@/clients/db/entertainers";
import { success } from "@/server-utils/api-responses";

export async function GET(_: Request) {
  const entertainers = await getAllEntertainers();
  return success(entertainers);
}
