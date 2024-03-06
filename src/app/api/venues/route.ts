import { getAllVenues } from "@/clients/db/venues";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const venues = await getAllVenues();
    return NextResponse.json(venues, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
