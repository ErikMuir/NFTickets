import { Entertainer } from "./Entertainer";
import { Venue } from "./Venue";

export type Event = {
  address: string;
  venue: string;
  entertainer: string;
  dateTime?: string;
  salesBegin?: string;
  salesEnd?: string;
  finalized: boolean;
};

export enum EventStatus {
  Unknown = "Unknown",
  Unfinalized = "Unfinalized",
  PreSales = "Pre-Sales",
  OpenSales = "Open Sales",
  PostSales = "Post-Sales",
  PastEvent = "Past Event",
}

export type EventDto = {
  address: string;
  venue: Partial<Venue>;
  entertainer: Partial<Entertainer>;
  dateTime?: string;
  salesBegin?: string;
  salesEnd?: string;
  finalized: boolean;
  preSales: boolean;
  postSales: boolean;
  pastEvent: boolean;
  status: EventStatus;
};

export const mapEventFromDb = ({
  address,
  date_time,
  sales_begin,
  sales_end,
  finalized,
  venue_account,
  venue_name,
  venue_address,
  venue_city,
  venue_state,
  venue_zip,
  entertainer_account,
  entertainer_name,
  entertainer_image_url,
}: any): EventDto => {
  const now = new Date().toISOString();
  const preSales = sales_begin && sales_begin > now;
  const postSales = sales_end && sales_end <= now;
  const pastEvent = date_time && date_time <= now;
  return {
    address,
    venue: {
      account: venue_account,
      name: venue_name,
      address: venue_address || undefined,
      city: venue_city || undefined,
      state: venue_state || undefined,
      zip: venue_zip || undefined,
    },
    entertainer: {
      account: entertainer_account,
      name: entertainer_name,
      imageUrl: entertainer_image_url || undefined,
    },
    dateTime: date_time || undefined,
    salesBegin: sales_begin || undefined,
    salesEnd: sales_end || undefined,
    finalized,
    preSales,
    postSales,
    pastEvent,
    status: getStatus(date_time, sales_begin, sales_end, finalized),
  };
};

export const mapEventFromApi = ({
  address,
  venue,
  entertainer,
  dateTime,
  salesBegin,
  salesEnd,
  finalized,
}: any): EventDto => {
  const now = new Date().toISOString();
  const preSales = salesBegin && salesBegin > now;
  const postSales = salesEnd && salesEnd <= now;
  const pastEvent = dateTime && dateTime <= now;
  return {
    address,
    venue: {
      account: venue.account,
      name: venue.name,
      address: venue.address,
      city: venue.city,
      state: venue.state,
      zip: venue.zip,
    },
    entertainer: {
      account: entertainer.account,
      name: entertainer.name,
      imageUrl: entertainer.imageUrl,
    },
    dateTime,
    salesBegin,
    salesEnd,
    finalized,
    preSales,
    postSales,
    pastEvent,
    status: getStatus(dateTime, salesBegin, salesEnd, finalized),
  };
};

const getStatus = (dateTime: string, salesBegin: string, salesEnd: string, finalized: boolean): EventStatus => {
  const now = new Date().toISOString();
  if (!finalized) return EventStatus.Unfinalized;
  if (salesBegin && salesBegin > now) return EventStatus.PreSales;
  if (salesEnd && salesEnd <= now) return EventStatus.PostSales;
  if (dateTime && dateTime <= now) return EventStatus.PastEvent;
  if (salesBegin && salesEnd) return EventStatus.OpenSales;
  return EventStatus.Unknown
};
