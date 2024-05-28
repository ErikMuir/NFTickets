import { getEvent } from "@/clients/db";
import { success } from "@/utils/server/api-responses";

export async function GET(
  _: Request,
  { params }: { params: { event: string } }
) {
  const event = await getEvent(params.event);
  return success(event);
}
