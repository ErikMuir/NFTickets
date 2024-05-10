import { getEntertainer, updateEntertainer } from "@/clients/db/entertainers";
import { Entertainer } from "@/models";
import { badRequest, success } from "@/utils/server/api-responses";

export async function GET(
  _: Request,
  { params }: { params: { account: string } }
) {
  const entertainer = await getEntertainer(params.account);
  return success(entertainer);
}

export async function PUT(
  request: Request,
  { params }: { params: { account: string } }
) {
  const entertainer = (await request.json()) as Entertainer;
  if (entertainer.account !== params.account) {
    return badRequest("Mismatched account id");
  }
  await updateEntertainer(entertainer);
  return success(entertainer);
}
