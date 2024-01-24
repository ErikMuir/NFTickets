import { QueryResult, sql } from "@vercel/postgres";

export const createWalletsTable = (): Promise<QueryResult> => {
  return sql`
    CREATE TABLE IF NOT EXISTS wallets (
      id         uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
      address    text NOT NULL UNIQUE,
      role       text NULL,
      created_at text NOT NULL DEFAULT timezone('utc', now()),
      updated_at text NOT NULL DEFAULT timezone('utc', now())
    );
  `;
};

export const createVenuesTable = async (): Promise<QueryResult> => {
  return sql`
    CREATE TABLE IF NOT EXISTS venues (
      id           uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
      wallet_id    uuid NOT NULL UNIQUE REFERENCES wallets ON DELETE CASCADE,
      name         text NOT NULL,
      description  text NULL,
      address      text NULL,
      city         text NULL,
      state        text NULL,
      zip          text NULL,
      created_at   text NOT NULL DEFAULT timezone('utc', now()),
      updated_at   text NOT NULL DEFAULT timezone('utc', now())
    );
  `;
};

export const createEntertainersTable = async (): Promise<QueryResult> => {
  return sql`
    CREATE TABLE IF NOT EXISTS entertainers (
      id          uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
      wallet_id   uuid NOT NULL UNIQUE REFERENCES wallets ON DELETE CASCADE,
      type        text NOT NULL,
      name        text NOT NULL,
      description text NULL,
      iteration   text NULL,
      created_at  text NOT NULL DEFAULT timezone('utc', now()),
      updated_at  text NOT NULL DEFAULT timezone('utc', now())
    );
  `;
};

export const deleteAllWallets = async (): Promise<QueryResult> => {
  return sql`DELETE FROM wallets;`;
};

export const dropVenuesTable = async (): Promise<QueryResult> => {
  return sql`DROP TABLE IF EXISTS venues CASCADE;`;
};

export const dropEntertainersTable = async (): Promise<QueryResult> => {
  return sql`DROP TABLE IF EXISTS entertainers CASCADE;`;
};

export const dropWalletsTable = async (): Promise<QueryResult> => {
  return sql`DROP TABLE IF EXISTS wallets CASCADE;`;
};

export const insertWallet = async (address: string): Promise<QueryResult> => {
  return sql`INSERT INTO wallets ( address ) VALUES ( ${address} );`;
};

export const insertVenue = async (address: string): Promise<QueryResult> => {
  return sql`INSERT INTO venues ( walletId ) SELECT id FROM wallets WHERE address = ${address};`;
};

export const insertEntertainer = async (address: string): Promise<QueryResult> => {
  return sql`INSERT INTO entertainers ( walletId ) SELECT id FROM wallets WHERE address = ${address};`;
};

export const removeWallet = async (address: string): Promise<QueryResult> => {
  return sql`DELETE FROM wallets WHERE address = ${address};`;
};

export const removeVenue = async (address: string): Promise<QueryResult> => {
  return sql`DELETE FROM venues WHERE walletId = (SELECT id FROM wallets WHERE address = ${address});`;
};

export const removeEntertainer = async (address: string): Promise<QueryResult> => {
  return sql`DELETE FROM entertainers WHERE walletId = (SELECT id FROM wallets WHERE address = ${address});`;
};
