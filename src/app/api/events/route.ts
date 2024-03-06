import { getAllEvents } from "@/clients/db/events";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const events = await getAllEvents();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
