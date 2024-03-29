import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";
import {
  Entertainer,
  Event,
  Role,
  Section,
  Ticket,
  Venue,
  Wallet,
} from "@/models";

////////////---> create <---////////////

export const createWalletsTable = (): Promise<QueryResult<QueryResultRow>> => {
  return sql`
    CREATE TABLE IF NOT EXISTS wallets (
      account text PRIMARY KEY NOT NULL,
      role    text NOT NULL DEFAULT('attendee')
    );
  `;
};

export const createEntertainersTable = async (): Promise<
  QueryResult<QueryResultRow>
> => {
  return sql`
    CREATE TABLE IF NOT EXISTS entertainers (
      account     text PRIMARY KEY NOT NULL REFERENCES wallets,
      type        text NOT NULL,
      name        text NOT NULL,
      description text NULL,
      iteration   text NULL,
      image_url   text NULL
    );
  `;
};

export const createVenuesTable = async (): Promise<
  QueryResult<QueryResultRow>
> => {
  return sql`
    CREATE TABLE IF NOT EXISTS venues (
      account     text PRIMARY KEY NOT NULL REFERENCES wallets,
      name        text NOT NULL,
      description text NULL,
      address     text NULL,
      city        text NULL,
      state       text NULL,
      zip         text NULL,
      image_url   text NULL
    );
  `;
};

export const createSectionsTable = async (): Promise<
  QueryResult<QueryResultRow>
> => {
  return sql`
    CREATE TABLE IF NOT EXISTS sections (
      venue    text    NOT NULL REFERENCES venues,
      section  text    NOT NULL,
      capacity integer NOT NULL DEFAULT 0,
      PRIMARY KEY(venue, section)
    );
  `;
};

export const createEventsTable = async (): Promise<
  QueryResult<QueryResultRow>
> => {
  return sql`
    CREATE TABLE IF NOT EXISTS events (
      address     text    PRIMARY KEY NOT NULL,
      venue       text    NOT NULL REFERENCES venues,
      entertainer text    NOT NULL REFERENCES entertainers,
      date_time   text    NULL,
      sales_begin text    NULL,
      sales_end   text    NULL,
      finalized   boolean NOT NULL DEFAULT FALSE
    );
  `;
};

export const createTicketsTable = async (): Promise<
  QueryResult<QueryResultRow>
> => {
  return sql`
    CREATE TABLE IF NOT EXISTS tickets (
      token       text    NOT NULL,
      serial      integer NOT NULL,
      venue       text    NOT NULL REFERENCES venues,
      entertainer text    NOT NULL REFERENCES entertainers,
      event       text    NOT NULL REFERENCES events,
      section     text    NOT NULL,
      scanned_at  text    NULL,
      scanned_by  text    NULL,
      PRIMARY KEY(token, serial)
    );
  `;
};

////////////---> drop <---////////////

export const dropWalletsTable = async (): Promise<
  QueryResult<QueryResultRow>
> => {
  return sql`DROP TABLE IF EXISTS wallets;`;
};

export const dropEntertainersTable = async (): Promise<
  QueryResult<QueryResultRow>
> => {
  return sql`DROP TABLE IF EXISTS entertainers;`;
};

export const dropVenuesTable = async (): Promise<
  QueryResult<QueryResultRow>
> => {
  return sql`DROP TABLE IF EXISTS venues;`;
};

export const dropSectionsTable = async (): Promise<
  QueryResult<QueryResultRow>
> => {
  return sql`DROP TABLE IF EXISTS sections;`;
};

export const dropEventsTable = async (): Promise<
  QueryResult<QueryResultRow>
> => {
  return sql`DROP TABLE IF EXISTS events;`;
};

export const dropTicketsTable = async (): Promise<
  QueryResult<QueryResultRow>
> => {
  return sql`DROP TABLE IF EXISTS tickets;`;
};

////////////---> delete <---////////////

export const deleteWallet = async (
  account: string
): Promise<QueryResult<QueryResultRow>> => {
  return sql`DELETE FROM wallets WHERE account = ${account};`;
};

export const deleteEntertainer = async (
  account: string
): Promise<QueryResult<QueryResultRow>> => {
  return sql`DELETE FROM entertainers WHERE account = ${account};`;
};

export const deleteVenue = async (
  account: string
): Promise<QueryResult<QueryResultRow>> => {
  return sql`DELETE FROM venues WHERE account = ${account};`;
};

export const deleteSection = async (
  venue: string,
  section: string
): Promise<QueryResult<QueryResultRow>> => {
  return sql`DELETE FROM sections WHERE venue = ${venue} AND section = ${section};`;
};

export const deleteEvent = async (
  address: string
): Promise<QueryResult<QueryResultRow>> => {
  return sql`DELETE FROM events WHERE address = ${address};`;
};

export const deleteTicket = async (
  token: string,
  serial: number
): Promise<QueryResult<QueryResultRow>> => {
  return sql`DELETE FROM tickets WHERE token = ${token} AND serial = ${serial};`;
};

////////////---> delete all <---////////////

export const deleteAllWallets = async (): Promise<
  QueryResult<QueryResultRow>
> => {
  return sql`DELETE FROM wallets;`;
};

export const deleteAllEntertainers = async (): Promise<
  QueryResult<QueryResultRow>
> => {
  return sql`DELETE FROM entertainers;`;
};

export const deleteAllVenues = async (): Promise<
  QueryResult<QueryResultRow>
> => {
  return sql`DELETE FROM venues;`;
};

export const deleteAllSections = async (): Promise<
  QueryResult<QueryResultRow>
> => {
  return sql`DELETE FROM sections;`;
};

export const deleteAllEvents = async (): Promise<
  QueryResult<QueryResultRow>
> => {
  return sql`DELETE FROM events;`;
};

export const deleteAllTickets = async (): Promise<
  QueryResult<QueryResultRow>
> => {
  return sql`DELETE FROM tickets;`;
};

////////////---> insert <---////////////

export const insertWallet = async ({
  account,
  role,
}: Wallet): Promise<QueryResult<QueryResultRow>> => {
  return sql`INSERT INTO wallets ( account, role ) VALUES ( ${account}, ${role} );`;
};

export const insertEntertainer = async ({
  account,
  name,
  type,
  description,
  iteration,
  imageUrl,
}: Entertainer): Promise<QueryResult<QueryResultRow>> => {
  return sql`
    INSERT INTO entertainers ( account, name, type, description, iteration, image_url )
    SELECT account, ${name}, ${type}, ${description}, ${iteration}, ${imageUrl}
    FROM wallets
    WHERE account = ${account} AND role = ${Role.ENTERTAINER};
  `;
};

export const insertVenue = async ({
  account,
  name,
  address,
  city,
  state,
  zip,
  imageUrl,
}: Venue): Promise<QueryResult<QueryResultRow>> => {
  return sql`
    INSERT INTO venues ( account, name, address, city, state, zip, image_url )
    SELECT account, ${name}, ${address}, ${city}, ${state}, ${zip}, ${imageUrl}
    FROM wallets
    WHERE account = ${account} AND role = ${Role.VENUE};
  `;
};

export const insertSection = async ({
  venue,
  section,
  capacity,
}: Section): Promise<QueryResult<QueryResultRow>> => {
  return sql`
    INSERT INTO sections ( venue, section, capacity )
    SELECT account, ${section}, ${capacity}
    FROM venues
    WHERE account = ${venue};
  `;
};

export const insertEvent = async ({
  address,
  venue,
  entertainer,
  dateTime,
  salesBegin: ticketSalesBegin,
  salesEnd: ticketSalesEnd,
  finalized,
}: Event): Promise<QueryResult<QueryResultRow>> => {
  return sql`
    INSERT INTO events ( address, venue, entertainer, date_time, sales_begin, sales_end, finalized )
    SELECT
      ${address},
      (
        SELECT account
        FROM venues
        WHERE account = ${venue}
        LIMIT 1
      ),
      (
        SELECT account
        FROM entertainers
        WHERE account = ${entertainer}
        LIMIT 1
      ),
      ${dateTime?.toISOString()},
      ${ticketSalesBegin?.toISOString()},
      ${ticketSalesEnd?.toISOString()},
      ${finalized ?? false};
  `;
};

export const insertTicket = async ({
  token,
  serial,
  venue,
  entertainer,
  event,
  section,
}: Ticket): Promise<QueryResult<QueryResultRow>> => {
  return sql`
    INSERT INTO tickets ( token, serial, venue, entertainer, event, section )
    SELECT
      ${token},
      ${serial},
      (
        SELECT account
        FROM venues
        WHERE account = ${venue}
        LIMIT 1
      ),
      (
        SELECT account
        FROM entertainers
        WHERE account = ${entertainer}
        LIMIT 1
      ),
      (
        SELECT address
        FROM events
        WHERE address = ${event} AND venue = ${venue} AND entertainer = ${entertainer}
        LIMIT 1
      ),
      (
        SELECT section
        FROM sections
        WHERE venue = ${venue} AND section = ${section}
        LIMIT 1
      );
  `;
};
