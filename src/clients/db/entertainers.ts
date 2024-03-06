import { sql } from "@vercel/postgres";
import { type Entertainer, mapEntertainer, EntertainerType } from "@/models";

export const getEntertainer = async (
  account: string
): Promise<Entertainer | null> => {
  const result = await sql`
    SELECT
      account,
      type,
      name,
      description,
      iteration
    FROM entertainers
    WHERE account = ${account};
  `;
  return result.rowCount === 0 ? null : mapEntertainer(result.rows[0]);
};

export const getAllEntertainers = async (): Promise<Entertainer[]> => {
  const result = await sql`
  SELECT
    account,
    type,
    name,
    description,
    iteration
  FROM entertainers;
`;
  return result.rows.map(mapEntertainer);
};

export const getEntertainersByType = async (
  type: EntertainerType
): Promise<Entertainer[]> => {
  const result = await sql`
    SELECT
      account,
      type,
      name,
      description,
      iteration
    FROM entertainers
    WHERE type = ${type};
  `;
  return result.rows.map(mapEntertainer);
};

export const insertEntertainer = async (
  entertainer: Entertainer
): Promise<void> => {
  const { rowCount } = await sql`
    INSERT INTO entertainers
    (
      account,
      type,
      name,
      description,
      iteration
    )
    SELECT
      account,
      ${entertainer.type},
      ${entertainer.name},
      ${entertainer.description},
      ${entertainer.iteration}
    FROM wallets
    WHERE account = ${entertainer.account};
  `;
  if (rowCount === 0) {
    throw new Error(
      `Failed to insert entertainer with account ${entertainer.account}`
    );
  }
};

export const updateEntertainer = async (
  entertainer: Entertainer
): Promise<void> => {
  const { rowCount } = await sql`
    UPDATE entertainers
    SET
      type = ${entertainer.type},
      name = ${entertainer.name},
      description = ${entertainer.description},
      iteration = ${entertainer.iteration}
    WHERE account = ${entertainer.account};
  `;
  if (rowCount === 0) {
    throw new Error(
      `Failed to update entertainer with account ${entertainer.account}`
    );
  }
};

export const deleteEntertainer = async (account: string): Promise<void> => {
  const { rowCount } = await sql`
    DELETE FROM entertainers
    WHERE account = ${account};
  `;
  if (rowCount === 0) {
    throw new Error(
      `Failed to delete entertainer with account ${account}`
    );
  }
};
