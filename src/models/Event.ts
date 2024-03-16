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
  venueName: string;
  venueAccount: string;
  entertainerName: string;
  entertainerAccount: string;
  dateTime?: Date;
  ticketSalesBegin?: Date;
  ticketSalesEnd?: Date;
  imageUrl?: string;
};

export const mapEvent = ({
  address,
  venue_name,
  venue_account,
  entertainer_name,
  entertainer_account,
  date_time,
  sales_begin,
  sales_end,
  image_url,
}: any): EventDto => ({
  address,
  venueName: venue_name,
  venueAccount: venue_account,
  entertainerName: entertainer_name,
  entertainerAccount: entertainer_account,
  dateTime: date_time ? new Date(date_time) : undefined,
  ticketSalesBegin: sales_begin ? new Date(sales_begin) : undefined,
  ticketSalesEnd: sales_end ? new Date(sales_end) : undefined,
  imageUrl: image_url,
});
