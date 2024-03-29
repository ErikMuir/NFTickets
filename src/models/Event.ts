import { Entertainer } from "./Entertainer";
import { Venue } from "./Venue";

export type Event = {
  address: string;
  venue: string;
  entertainer: string;
  dateTime?: Date;
  salesBegin?: Date;
  salesEnd?: Date;
  finalized: boolean;
};

export type EventDto = {
  address: string;
  venue: Partial<Venue>;
  entertainer: Partial<Entertainer>;
  dateTime?: Date;
  salesBegin?: Date;
  salesEnd?: Date;
  finalized: boolean;
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
}: any): EventDto => ({
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
  dateTime: date_time ? new Date(date_time) : undefined,
  salesBegin: sales_begin ? new Date(sales_begin) : undefined,
  salesEnd: sales_end ? new Date(sales_end) : undefined,
  finalized,
});

export const mapEventFromApi = ({
  address,
  venue,
  entertainer,
  dateTime,
  salesBegin,
  salesEnd,
  finalized,
}: any): EventDto => ({
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
  dateTime: dateTime ? new Date(dateTime) : undefined,
  salesBegin: salesBegin ? new Date(salesBegin) : undefined,
  salesEnd: salesEnd ? new Date(salesEnd) : undefined,
  finalized,
});
