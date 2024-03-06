import { sql } from "@vercel/postgres";
import { type Event, mapEvent } from "@/models";

export const getEvent = async (address: string): Promise<Event | null> => {
  const result = await sql`
    SELECT
      address,
      venue,
      entertainer,
      date_time,
      sales_begin,
      sales_end
    FROM events
    WHERE address = ${address};
  `;
  return result.rowCount === 0 ? null : mapEvent(result.rows[0]);
};

export const getAllEvents = async (): Promise<Event[]> => {
  const result = await sql`
    SELECT
      address,
      venue,
      entertainer,
      date_time,
      sales_begin,
      sales_end
    FROM events;
  `;
  return result.rows.map(mapEvent);
};

export const getEventsByVenue = async (venue: string): Promise<Event[]> => {
  const result = await sql`
    SELECT
      address,
      venue,
      entertainer,
      date_time,
      sales_begin,
      sales_end
    FROM events
    WHERE venue = ${venue};
  `;
  return result.rows.map(mapEvent);
};

export const getEventsByEntertainer = async (
  entertainer: string
): Promise<Event[]> => {
  const result = await sql`
    SELECT
      address,
      venue,
      entertainer,
      date_time,
      sales_begin,
      sales_end
    FROM events
    WHERE entertainer = ${entertainer};
  `;
  return result.rows.map(mapEvent);
};

export const insertEvent = async (event: Event): Promise<void> => {
  const { rowCount } = await sql`
    INSERT INTO events
    (
      address,
      venue,
      entertainer,
      date_time,
      sales_begin,
      sales_end
    )
    SELECT
      ${event.address}
      (
        SELECT account
        FROM venues
        WHERE account = ${event.venue}
        LIMIT 1
      ),
      (
        SELECT account
        FROM entertainers
        WHERE account = ${event.entertainer}
        LIMIT 1
      ),
      ${event.dateTime?.toISOString()},
      ${event.ticketSalesBegin?.toISOString()},
      ${event.ticketSalesEnd?.toISOString()};
  `;
  if (rowCount === 0) {
    throw new Error(`Failed to insert event ${event.address}`);
  }
};

export const updateEvent = async (event: Event): Promise<void> => {
  const { rowCount } = await sql`
    UPDATE events
    SET
      date_time = ${event.dateTime?.toISOString()},
      sales_begin = ${event.ticketSalesBegin?.toISOString()},
      sales_end = ${event.ticketSalesEnd?.toISOString()}
    WHERE address = ${event.address}
  `;
  if (rowCount === 0) {
    throw new Error(`Failed to update event ${event.address}`);
  }
};

export const deleteEvent = async (address: string): Promise<void> => {
  const { rowCount } = await sql`
    DELETE FROM events
    WHERE address = ${address};
  `;
  if (rowCount === 0) {
    throw new Error(`Failed to delete event ${address}`);
  }
};
