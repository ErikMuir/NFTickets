import { sql } from "@vercel/postgres";
import { Wallet, Venue, Entertainer } from "./models";

export const getWallet = async (address: string): Promise<Wallet | null> => {
  const result = await sql`
    SELECT *
    FROM wallets
    WHERE address = ${address}
  `;
  if (result.rowCount < 1) return null;
  const wallet = result.rows[0] as Wallet;
  return wallet;
};

export const getVenue = async (address: string): Promise<Venue | null> => {
  const result = await sql`
    SELECT v.*
    FROM venues AS v
    INNER JOIN wallets AS w ON w.id = v.walletId
    WHERE w.address = ${address}
  `;
  if (result.rowCount < 1) return null;
  return result.rows[0] as Venue;
};

export const getEntertainer = async (address: string): Promise<Entertainer | null> => {
  const result = await sql`
    SELECT e.*
    FROM entertainers AS e
    INNER JOIN wallets AS w ON w.id = e.walletId
    WHERE w.address = ${address}
  `;
  if (result.rowCount < 1) return null;
  return result.rows[0] as Entertainer;
};
