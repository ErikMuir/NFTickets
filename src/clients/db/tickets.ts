import { sql } from "@vercel/postgres";
import { type Ticket, mapTicket } from "@/models";

export const getTicket = async (
  token: string,
  serial: number
): Promise<Ticket | null> => {
  const result = await sql`
    SELECT
      token,
      serial,
      venue,
      entertainer,
      event,
      section,
      scanned_at,
      scanned_by
    FROM tickets
    WHERE
      token = ${token}
      AND serial = ${serial};
  `;
  return result.rowCount === 0 ? null : mapTicket(result.rows[0]);
};

export const insertTicket = async (ticket: Ticket): Promise<void> => {
  const { rowCount } = await sql`
    INSERT INTO tickets
    (
      token,
      serial,
      venue,
      entertainer,
      event,
      section,
      scanned_at,
      scanned_by
    )
    SELECT
      ${ticket.token},
      ${ticket.serial},
      (
        SELECT account
        FROM venues
        WHERE account = ${ticket.venue}
        LIMIT 1
      ),
      (
        SELECT account
        FROM entertainers
        WHERE account = ${ticket.entertainer}
        LIMIT 1
      ),
      (
        SELECT address
        FROM events
        WHERE address = ${ticket.event}
        LIMIT 1
      ),
      (
        SELECT section
        FROM sections
        WHERE venue = ${ticket.venue} AND section = ${ticket.section}
        LIMIT 1
      ),
      ${ticket.scannedAt?.toISOString()},
      ${ticket.scannedBy};
  `;
  if (rowCount === 0) {
    throw new Error(`Failed to insert ticket ${ticket.token}:${ticket.serial}`);
  }
};

export const updateTicket = async (ticket: Ticket): Promise<void> => {
  const { rowCount } = await sql`
    UPDATE tickets
    SET
      scanned_at = ${ticket.scannedAt?.toISOString()},
      scanned_by = ${ticket.scannedBy}
    WHERE
      token = ${ticket.token}
      AND serial = ${ticket.serial};
  `;
  if (rowCount === 0) {
    throw new Error(`Failed to update ticket ${ticket.token}:${ticket.serial}`);
  }
};

export const deleteTicket = async (
  token: string,
  serial: number
): Promise<void> => {
  const { rowCount } = await sql`
    DELETE FROM tickets
    WHERE token = ${token} AND serial = ${serial};
  `;
  if (rowCount === 0) {
    throw new Error(`Failed to delete ticket ${token}:${serial}`);
  }
};
