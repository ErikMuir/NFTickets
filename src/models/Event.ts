export type Event = {
  address: string;
  venue: string;
  entertainer: string;
  dateTime?: Date;
  ticketSalesBegin?: Date;
  ticketSalesEnd?: Date;
};

export const mapEvent = ({
  address,
  venue,
  entertainer,
  date_time,
  sales_begin,
  sales_end,
}: any): Event => ({
  address,
  venue,
  entertainer,
  dateTime: date_time ? new Date(date_time) : undefined,
  ticketSalesBegin: sales_begin ? new Date(sales_begin) : undefined,
  ticketSalesEnd: sales_end ? new Date(sales_end) : undefined,
});
