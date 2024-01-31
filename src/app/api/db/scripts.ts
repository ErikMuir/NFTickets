import { EntertainerType } from "@/clients/db/types";
import { QueryResult, sql } from "@vercel/postgres";

////////////---> create <---////////////

export const createWalletsTable = (): Promise<QueryResult> => {
  return sql`
    CREATE TABLE IF NOT EXISTS wallets (
      account text PRIMARY KEY NOT NULL,
      role    text NULL
    );
  `;
};

export const createVenuesTable = async (): Promise<QueryResult> => {
  return sql`
    CREATE TABLE IF NOT EXISTS venues (
      account     text PRIMARY KEY NOT NULL REFERENCES wallets,
      name        text NOT NULL,
      description text NULL,
      location    text NULL
    );
  `;
};

export const createEntertainersTable = async (): Promise<QueryResult> => {
  return sql`
    CREATE TABLE IF NOT EXISTS entertainers (
      account     text PRIMARY KEY NOT NULL REFERENCES wallets,
      type        text NOT NULL,
      name        text NOT NULL,
      description text NULL,
      iteration   text NULL
    );
  `;
};

export const createEventsTable = async (): Promise<QueryResult> => {
  return sql`
    CREATE TABLE IF NOT EXISTS events (
      address     text PRIMARY KEY NOT NULL,
      venue       text NOT NULL REFERENCES venues,
      entertainer text NOT NULL REFERENCES entertainers
    );
  `;
};

export const createTicketsTable = async (): Promise<QueryResult> => {
  return sql`
    CREATE TABLE IF NOT EXISTS tickets (
      token       text NOT NULL,
      serial      integer NOT NULL,
      venue       text NOT NULL REFERENCES venues,
      entertainer text NOT NULL REFERENCES entertainers,
      event       text NOT NULL REFERENCES events,
      scanned_at  text NULL,
      scanned_by  text NULL,
      PRIMARY KEY(token, serial)
    );
  `;
};

////////////---> drop <---////////////

export const dropTicketsTable = async (): Promise<QueryResult> => {
  return sql`DROP TABLE IF EXISTS tickets;`;
};

export const dropEventsTable = async (): Promise<QueryResult> => {
  return sql`DROP TABLE IF EXISTS events;`;
};

export const dropVenuesTable = async (): Promise<QueryResult> => {
  return sql`DROP TABLE IF EXISTS venues;`;
};

export const dropEntertainersTable = async (): Promise<QueryResult> => {
  return sql`DROP TABLE IF EXISTS entertainers;`;
};

export const dropWalletsTable = async (): Promise<QueryResult> => {
  return sql`DROP TABLE IF EXISTS wallets;`;
};

////////////---> delete <---////////////

export const deleteWallet = async (account: string): Promise<QueryResult> => {
  return sql`DELETE FROM wallets WHERE account = ${account};`;
};

export const deleteVenue = async (account: string): Promise<QueryResult> => {
  return sql`DELETE FROM venues WHERE account = ${account};`;
};

export const deleteEntertainer = async (
  account: string
): Promise<QueryResult> => {
  return sql`DELETE FROM entertainers WHERE account = ${account};`;
};

export const deleteEvent = async (address: string): Promise<QueryResult> => {
  return sql`DELETE FROM events WHERE address = ${address}`;
};

export const deleteTicket = async (
  token: string,
  serial: number
): Promise<QueryResult> => {
  return sql`DELETE FROM tickets WHERE token = ${token} AND serial = ${serial}`;
};

////////////---> delete all <---////////////

export const deleteAllWallets = async (): Promise<QueryResult> => {
  return sql`DELETE FROM wallets;`;
};

export const deleteAllVenues = async (): Promise<QueryResult> => {
  return sql`DELETE FROM venues;`;
};

export const deleteAllEntertainers = async (): Promise<QueryResult> => {
  return sql`DELETE FROM entertainers;`;
};

export const deleteAllEvents = async (): Promise<QueryResult> => {
  return sql`DELETE FROM events;`;
};

export const deleteAllTickets = async (): Promise<QueryResult> => {
  return sql`DELETE FROM tickets;`;
};

////////////---> insert <---////////////

export const insertWallet = async (account: string): Promise<QueryResult> => {
  return sql`INSERT INTO wallets ( account ) VALUES ( ${account} );`;
};

export const insertVenue = async (
  account: string,
  name: string
): Promise<QueryResult> => {
  return sql`
    INSERT INTO venues ( account, name )
    SELECT account, ${name} FROM wallets WHERE account = ${account};
  `;
};

export const insertEntertainer = async (
  account: string,
  name: string,
  type: EntertainerType
): Promise<QueryResult> => {
  return sql`
    INSERT INTO entertainers ( account, name, type )
    SELECT account, ${name}, ${type} FROM wallets WHERE account = ${account};
  `;
};

export const insertEvent = async (
  address: string,
  venue: string,
  entertainer: string
): Promise<QueryResult> => {
  return sql`
    INSERT INTO events ( address, venue, entertainer )
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
      );
  `;
};

export const insertTicket = async (
  token: string,
  serial: number,
  venue: string,
  entertainer: string,
  event: string
): Promise<QueryResult> => {
  return sql`
    INSERT INTO tickets ( token, serial, venue, entertainer, event )
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
        WHERE address = ${event}
          AND venue = ${venue}
          AND entertainer = ${entertainer}
        LIMIT 1
      );
  `;
};
