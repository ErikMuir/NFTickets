import { NextResponse } from "next/server";
import { getAllVenues } from "@/clients/db/venues";

export async function GET(_: Request) {
  try {
    const venues = await getAllVenues();
    return NextResponse.json(venues, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
