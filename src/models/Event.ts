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
      address: venue_address,
      city: venue_city,
      state: venue_state,
      zip: venue_zip,
    },
    entertainer: {
      account: entertainer_account,
      name: entertainer_name,
      imageUrl: entertainer_image_url,
    },
    dateTime: date_time,
    salesBegin: sales_begin,
    salesEnd: sales_end,
    finalized,
    preSales,
    postSales,
    pastEvent,
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
    preSales: salesBegin && salesBegin > now,
    postSales: salesEnd && salesEnd <= now,
    pastEvent: dateTime && dateTime <= now,
  };
};
