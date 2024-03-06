import { NextResponse } from "next/server";
import { getAllEntertainers } from "@/clients/db/entertainers";

export async function GET(_: Request) {
  try {
    const entertainers = await getAllEntertainers();
    return NextResponse.json(entertainers, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
