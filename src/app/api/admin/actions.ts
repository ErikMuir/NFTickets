import { NextResponse } from "next/server";
import { QueryResult, sql } from "@vercel/postgres";
import { EntertainerType, Role } from "@/models";
import { entertainers, events, venues } from "@/demo-data";
import { Tables } from "./types";
import {
  createEntertainersTable,
  createEventsTable,
  createSectionsTable,
  createTicketsTable,
  createVenuesTable,
  createWalletsTable,
  deleteAllEntertainers,
  deleteAllEvents,
  deleteAllSections,
  deleteAllTickets,
  deleteAllVenues,
  deleteAllWallets,
  dropEntertainersTable,
  dropEventsTable,
  dropSectionsTable,
  dropTicketsTable,
  dropVenuesTable,
  dropWalletsTable,
  insertEntertainer,
  insertEvent,
  insertSection,
  insertVenue,
  insertWallet,
} from "./scripts";
import {
  getEntertainer,
  getVenue,
  getWallet,
  updateEntertainer,
  updateWallet,
} from "@/clients/db";

export async function up(): Promise<NextResponse> {
  const results: Record<string, QueryResult> = {};
  try {
    results[`create-${Tables.WALLETS}`] = await createWalletsTable();
    results[`create-${Tables.ENTERTAINERS}`] = await createEntertainersTable();
    results[`create-${Tables.VENUES}`] = await createVenuesTable();
    results[`create-${Tables.SECTIONS}`] = await createSectionsTable();
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
    results[`delete-${Tables.SECTIONS}`] = await deleteAllSections();
    results[`delete-${Tables.VENUES}`] = await deleteAllVenues();
    results[`delete-${Tables.ENTERTAINERS}`] = await deleteAllEntertainers();
    results[`delete-${Tables.WALLETS}`] = await deleteAllWallets();
    results[`drop-${Tables.TICKETS}`] = await dropTicketsTable();
    results[`drop-${Tables.EVENTS}`] = await dropEventsTable();
    results[`drop-${Tables.SECTIONS}`] = await dropSectionsTable();
    results[`drop-${Tables.VENUES}`] = await dropVenuesTable();
    results[`drop-${Tables.ENTERTAINERS}`] = await dropEntertainersTable();
    results[`drop-${Tables.WALLETS}`] = await dropWalletsTable();
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function reset(): Promise<NextResponse> {
  try {
    const results: Record<string, QueryResult> = {};
    results[`delete-${Tables.TICKETS}`] = await deleteAllTickets();
    results[`delete-${Tables.EVENTS}`] = await deleteAllEvents();
    results[`delete-${Tables.SECTIONS}`] = await deleteAllSections();
    results[`delete-${Tables.VENUES}`] = await deleteAllVenues();
    results[`delete-${Tables.ENTERTAINERS}`] = await deleteAllEntertainers();
    results[`delete-${Tables.WALLETS}`] = await deleteAllWallets();
    results[`drop-${Tables.TICKETS}`] = await dropTicketsTable();
    results[`drop-${Tables.EVENTS}`] = await dropEventsTable();
    results[`drop-${Tables.SECTIONS}`] = await dropSectionsTable();
    results[`drop-${Tables.VENUES}`] = await dropVenuesTable();
    results[`drop-${Tables.ENTERTAINERS}`] = await dropEntertainersTable();
    results[`drop-${Tables.WALLETS}`] = await dropWalletsTable();
    results[`create-${Tables.WALLETS}`] = await createWalletsTable();
    results[`create-${Tables.ENTERTAINERS}`] = await createEntertainersTable();
    results[`create-${Tables.VENUES}`] = await createVenuesTable();
    results[`create-${Tables.SECTIONS}`] = await createSectionsTable();
    results[`create-${Tables.EVENTS}`] = await createEventsTable();
    results[`create-${Tables.TICKETS}`] = await createTicketsTable();
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function seed(): Promise<NextResponse> {
  try {
    const results: Record<string, QueryResult> = {};

    const { phish, chiefs, heidecker } = entertainers;
    const { msg, arrowhead, moroccan } = venues;
    const { phishAtMsg, chiefsAtArrowhead, heideckerAtMoroccan } = events;

    // phish
    results[`phish-wallet`] = await insertWallet({
      account: phish.account,
      role: Role.ENTERTAINER,
    });
    results[`phish-entertainer`] = await insertEntertainer(phish);

    // chiefs
    results[`chiefs-wallet`] = await insertWallet({
      account: chiefs.account,
      role: Role.ENTERTAINER,
    });
    results[`chiefs-entertainer`] = await insertEntertainer(chiefs);

    // heidecker
    results[`heidecker-wallet`] = await insertWallet({
      account: heidecker.account,
      role: Role.ENTERTAINER,
    });
    results[`heidecker-entertainer`] = await insertEntertainer(heidecker);

    // msg
    results[`msg-wallet`] = await insertWallet({
      account: msg.account,
      role: Role.VENUE,
    });
    results[`msg-venue`] = await insertVenue(msg);
    const msgSections = Object.entries(msg.sections ?? {});
    for (let i = 0; i < msgSections.length; i++) {
      const [section, capacity] = msgSections[i];
      results[`msg-section-${section}`] = await insertSection({
        venue: msg.account,
        section,
        capacity,
      });
    }

    // arrowhead
    results[`arrowhead-wallet`] = await insertWallet({
      account: arrowhead.account,
      role: Role.VENUE,
    });
    results[`arrowhead-venue`] = await insertVenue(arrowhead);
    const arrowheadSections = Object.entries(arrowhead.sections ?? {});
    for (let i = 0; i < arrowheadSections.length; i++) {
      const [section, capacity] = arrowheadSections[i];
      results[`arrowhead-section-${section}`] = await insertSection({
        venue: arrowhead.account,
        section,
        capacity,
      });
    }

    // moroccan
    results[`moroccan-wallet`] = await insertWallet({
      account: moroccan.account,
      role: Role.VENUE,
    });
    results[`moroccan-venue`] = await insertVenue(moroccan);
    const moroccanSections = Object.entries(moroccan.sections ?? {});
    for (let i = 0; i < moroccanSections.length; i++) {
      const [section, capacity] = moroccanSections[i];
      results[`moroccan-section-${section}`] = await insertSection({
        venue: moroccan.account,
        section,
        capacity,
      });
    }

    // events
    results[`event-phish-at-msg`] = await insertEvent(phishAtMsg);
    results[`event-chiefs-at-arrowhead`] = await insertEvent(chiefsAtArrowhead);
    results[`event-heidecker-at-morrocan`] = await insertEvent(
      heideckerAtMoroccan
    );

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function setRole(
  account: string,
  role: Role,
  name: string,
): Promise<NextResponse> {
  try {
    const wallet = await getWallet(account);
    if (!wallet) return NextResponse.json({}, { status: 404 });
    await updateWallet({ ...wallet, role });

    if (role === Role.ENTERTAINER) {
      const entertainer = await getEntertainer(account);
      if (!entertainer)
        await insertEntertainer({
          account,
          name,
          type: EntertainerType.UNKNOWN,
        });
    }

    if (role === Role.VENUE) {
      const venue = await getVenue(account);
      if (!venue) await insertVenue({ account, name });
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function adHoc(): Promise<NextResponse> {
  //---------------------------------------------------
  // change this to whatever you need to do on the fly
  //---------------------------------------------------
  const account = "0.0.2935";
  const wallet = await getWallet(account);
  if (!wallet) return NextResponse.json({}, { status: 404 });
  wallet.role = Role.VENUE;
  await updateWallet(wallet);
  const result = await insertVenue({ account, name: "" });
  //---------------------------------------------------

  return NextResponse.json({ result }, { status: 200 });
}
