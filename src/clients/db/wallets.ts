import { sql } from "@vercel/postgres";
import { type Wallet, mapWallet } from "@/models";

export const getWallet = async (account: string): Promise<Wallet | null> => {
  const result = await sql`
    SELECT account, role
    FROM wallets
    WHERE account = ${account};
  `;
  return result.rowCount === 0 ? null : mapWallet(result.rows[0]);
};

export const insertWallet = async (wallet: Wallet): Promise<void> => {
  const { rowCount } = await sql`
    INSERT INTO wallets ( account, role )
    VALUES ( ${wallet.account}, ${wallet.role} );
  `;
  if (rowCount === 0) {
    throw new Error(`Failed to insert wallet ${wallet.account}`);
  }
};

export const updateWallet = async (wallet: Wallet): Promise<void> => {
  const { rowCount } = await sql`
    UPDATE wallets
    SET role = ${wallet.role}
    WHERE account = ${wallet.account};
  `;
  if (rowCount === 0) {
    throw new Error(`Failed to update wallet ${wallet.account}`);
  }
};

export const deleteWallet = async (account: string): Promise<void> => {
  const { rowCount } = await sql`
    DELETE FROM wallets
    WHERE account = ${account};
  `;
  if (rowCount === 0) {
    throw new Error(`Failed to delete wallet ${account}`);
  }
};
