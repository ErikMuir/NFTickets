import { sql } from "@vercel/postgres";
import { type Venue, mapVenue } from "@/models";

export const getVenue = async (account: string): Promise<Venue | null> => {
  const result = await sql`
    SELECT
      account,
      name,
      description,
      location
    FROM venues
    WHERE account = ${account};
  `;
  return result.rowCount === 0 ? null : mapVenue(result.rows[0]);
};

export const insertVenue = async (venue: Venue): Promise<void> => {
  const { rowCount } = await sql`
    INSERT INTO venues
    (
      account,
      name,
      description,
      location
    )
    SELECT
      account,
      ${venue.name},
      ${venue.description},
      ${venue.location}
    FROM wallets
    WHERE account = ${venue.account};
  `;
  if (rowCount === 0) {
    throw new Error(`Failed to insert venue ${venue.account}`);
  }
};

export const updateVenue = async (venue: Venue): Promise<void> => {
  const { rowCount } = await sql`
    UPDATE venues
    SET
      name = ${venue.name},
      description = ${venue.description},
      location = ${venue.location}
    WHERE account = ${venue.account};
  `;
  if (rowCount === 0) {
    throw new Error(`Failed to update venue ${venue.account}`);
  }
};

export const deleteVenue = async (account: string): Promise<void> => {
  const { rowCount } = await sql`
    DELETE FROM venues
    WHERE account = ${account};
  `;
  if (rowCount === 0) {
    throw new Error(`Failed to delete venue ${account}`);
  }
};
