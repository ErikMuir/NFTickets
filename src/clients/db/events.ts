import { sql } from "@vercel/postgres";
import { type Event, type EventDto, mapEvent } from "@/models";

export const getEvent = async (address: string): Promise<EventDto | null> => {
  const result = await sql`
    SELECT
      ev.address,
      ev.date_time,
      ev.sales_begin,
      ev.sales_end,
      v.account AS venue_account,
      v.name AS venue_name,
      v.address AS venue_address,
      v.city AS venue_city,
      v.state AS venue_state,
      v.zip AS venue_zip,
      en.account AS entertainer_account,
      en.name AS entertainer_name,
      en.image_url AS entertainer_image_url
    FROM events AS ev
    INNER JOIN entertainers AS en ON en.account = ev.entertainer
    INNER JOIN venues AS v ON v.account = ev.venue
    WHERE address = ${address};
  `;
  return result.rowCount === 0 ? null : mapEvent(result.rows[0]);
};

export const getAllEvents = async (): Promise<EventDto[]> => {
  const result = await sql`
    SELECT
      ev.address,
      ev.date_time,
      ev.sales_begin,
      ev.sales_end,
      v.account AS venue_account,
      v.name AS venue_name,
      v.address AS venue_address,
      v.city AS venue_city,
      v.state AS venue_state,
      v.zip AS venue_zip,
      en.account AS entertainer_account,
      en.name AS entertainer_name,
      en.image_url AS entertainer_image_url
    FROM events AS ev
    INNER JOIN entertainers AS en ON en.account = ev.entertainer
    INNER JOIN venues AS v ON v.account = ev.venue;
  `;
  return result.rows.map(mapEvent);
};

export const getEventsByVenue = async (venue: string): Promise<EventDto[]> => {
  const result = await sql`
    SELECT
      ev.address,
      ev.date_time,
      ev.sales_begin,
      ev.sales_end,
      v.account AS venue_account,
      v.name AS venue_name,
      v.address AS venue_address,
      v.city AS venue_city,
      v.state AS venue_state,
      v.zip AS venue_zip,
      en.account AS entertainer_account,
      en.name AS entertainer_name,
      en.image_url AS entertainer_image_url
    FROM events AS ev
    INNER JOIN entertainers AS en ON en.account = ev.entertainer
    INNER JOIN venues AS v ON v.account = ev.venue
    WHERE venue = ${venue};
  `;
  return result.rows.map(mapEvent);
};

export const getEventsByEntertainer = async (
  entertainer: string
): Promise<EventDto[]> => {
  const result = await sql`
    SELECT
      ev.address,
      ev.date_time,
      ev.sales_begin,
      ev.sales_end,
      v.account AS venue_account,
      v.name AS venue_name,
      v.address AS venue_address,
      v.city AS venue_city,
      v.state AS venue_state,
      v.zip AS venue_zip,
      en.account AS entertainer_account,
      en.name AS entertainer_name,
      en.image_url AS entertainer_image_url
    FROM events AS ev
    INNER JOIN entertainers AS en ON en.account = ev.entertainer
    INNER JOIN venues AS v ON v.account = ev.venue
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
