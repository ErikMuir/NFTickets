import { getAllEntertainers } from "@/clients/db/entertainers";
import { success } from "@/utils/server/api-responses";

export async function GET(_: Request) {
  const entertainers = await getAllEntertainers();
  return success(entertainers);
}
