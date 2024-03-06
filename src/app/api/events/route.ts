import { NextResponse } from "next/server";
import { getAllEvents } from "@/clients/db/events";

export async function GET(_: Request) {
  try {
    const events = await getAllEvents();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
