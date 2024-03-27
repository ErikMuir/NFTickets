import { Entertainer } from "./Entertainer";
import { Venue } from "./Venue";

export type Event = {
  address: string;
  venue: string;
  entertainer: string;
  dateTime?: Date;
  ticketSalesBegin?: Date;
  ticketSalesEnd?: Date;
};

export type EventDto = {
  address: string;
  venue: Partial<Venue>;
  entertainer: Partial<Entertainer>;
  dateTime?: Date;
  ticketSalesBegin?: Date;
  ticketSalesEnd?: Date;
};

export const mapEvent = ({
  address,
  date_time,
  sales_begin,
  sales_end,
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
  ticketSalesBegin: sales_begin ? new Date(sales_begin) : undefined,
  ticketSalesEnd: sales_end ? new Date(sales_end) : undefined,
});
