import { ForbiddenError } from "@/server-utils/api-errors";
import { authorize } from "@/server-utils/authorize";
import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    authorize(request);
    const results: QueryResult<QueryResultRow>[] = [];
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error }, { status: 403 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}
