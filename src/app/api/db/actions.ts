import { QueryResult } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { Tables } from "./types";
import {
  createEntertainersTable,
  createVenuesTable,
  createWalletsTable,
  deleteAllWallets,
  dropEntertainersTable,
  dropVenuesTable,
  dropWalletsTable,
  insertEntertainer,
  insertVenue,
  insertWallet,
  deleteEntertainer,
  deleteVenue,
  deleteWallet,
  createEventsTable,
  createTicketsTable,
  deleteAllEvents,
  deleteAllTickets,
  deleteAllVenues,
  deleteAllEntertainers,
  dropTicketsTable,
  dropEventsTable,
} from "./scripts";
import { EntertainerType } from "@/clients/db/types";

export async function up(): Promise<NextResponse> {
  const results: Record<string, QueryResult> = {};
  try {
    results[`create-${Tables.WALLETS}`] = await createWalletsTable();
    results[`create-${Tables.VENUES}`] = await createVenuesTable();
    results[`create-${Tables.ENTERTAINERS}`] = await createEntertainersTable();
    results[`create-${Tables.EVENTS}`] = await createEventsTable();
    results[`create-${Tables.TICKETS}`] = await createTicketsTable();
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function down(): Promise<NextResponse> {
  const results: Record<string, QueryResult> = {};
  try {
    results[`delete-${Tables.TICKETS}`] = await deleteAllTickets();
    results[`delete-${Tables.EVENTS}`] = await deleteAllEvents();
    results[`delete-${Tables.VENUES}`] = await deleteAllVenues();
    results[`delete-${Tables.ENTERTAINERS}`] = await deleteAllEntertainers();
    results[`delete-${Tables.WALLETS}`] = await deleteAllWallets();
    results[`drop-${Tables.TICKETS}`] = await dropTicketsTable();
    results[`drop-${Tables.EVENTS}`] = await dropEventsTable();
    results[`drop-${Tables.VENUES}`] = await dropVenuesTable();
    results[`drop-${Tables.ENTERTAINERS}`] = await dropEntertainersTable();
    results[`drop-${Tables.WALLETS}`] = await dropWalletsTable();
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function insert(
  table: string,
  address: string
): Promise<NextResponse> {
  let result: QueryResult;

  if (!address) {
    return NextResponse.json(
      { error: "address not provided" },
      { status: 400 }
    );
  }

  switch (table) {
    case Tables.WALLETS:
      result = await insertWallet(address);
      break;
    case Tables.VENUES:
      result = await insertVenue(address, "");
      break;
    case Tables.ENTERTAINERS:
      result = await insertEntertainer(address, "", EntertainerType.UNKNOWN);
      break;
    case Tables.NONE:
      return NextResponse.json(
        { error: "table not provided" },
        { status: 400 }
      );
    default:
      return NextResponse.json(
        { error: `unknown table: '${table}'` },
        { status: 400 }
      );
  }

  return NextResponse.json({ result }, { status: 200 });
}

export async function remove(
  table: string,
  address: string
): Promise<NextResponse> {
  let result: QueryResult;

  if (!address) {
    return NextResponse.json(
      { error: "address not provided" },
      { status: 400 }
    );
  }

  switch (table) {
    case Tables.WALLETS:
      result = await deleteWallet(address);
      break;
    case Tables.VENUES:
      result = await deleteVenue(address);
      break;
    case Tables.ENTERTAINERS:
      result = await deleteEntertainer(address);
      break;
    case Tables.NONE:
      return NextResponse.json(
        { error: "table not provided" },
        { status: 400 }
      );
    default:
      return NextResponse.json(
        { error: `unknown table: '${table}'` },
        { status: 400 }
      );
  }

  return NextResponse.json({ result }, { status: 200 });
}
