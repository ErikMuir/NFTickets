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
  removeEntertainer,
  removeVenue,
  removeWallet,
} from "./scripts";

export async function up(): Promise<NextResponse> {
  const results: Record<string, QueryResult> = {};
  try {
    results[`create-${Tables.WALLETS}`] = await createWalletsTable();
    results[`create-${Tables.VENUES}`] = await createVenuesTable();
    results[`create-${Tables.ENTERTAINERS}`] = await createEntertainersTable();
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function down(): Promise<NextResponse> {
  const results: Record<string, QueryResult> = {};
  try {
    results[`delete-${Tables.WALLETS}`] = await deleteAllWallets();
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
    return NextResponse.json({ error: "address not provided" }, { status: 400 });
  }

  switch (table) {
    case Tables.WALLETS:
      result = await insertWallet(address);
      break;
    case Tables.VENUES:
      result = await insertVenue(address);
      break;
    case Tables.ENTERTAINERS:
      result = await insertEntertainer(address);
      break;
    case Tables.NONE:
      return NextResponse.json({ error: "table not provided" }, { status: 400 });
    default:
      return NextResponse.json({ error: `unknown table: '${table}'` }, { status: 400 });
  }

  return NextResponse.json({ result }, { status: 200 });
}

export async function remove(
  table: string,
  address: string
): Promise<NextResponse> {
  let result: QueryResult;

  if (!address) {
    return NextResponse.json({ error: "address not provided" }, { status: 400 });
  }

  switch (table) {
    case Tables.WALLETS:
      result = await removeWallet(address);
      break;
    case Tables.VENUES:
      result = await removeVenue(address);
      break;
    case Tables.ENTERTAINERS:
      result = await removeEntertainer(address);
      break;
    case Tables.NONE:
      return NextResponse.json({ error: "table not provided" }, { status: 400 });
    default:
      return NextResponse.json({ error: `unknown table: '${table}'` }, { status: 400 });
  }

  return NextResponse.json({ result }, { status: 200 });
}
