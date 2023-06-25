import { Event } from "@/types";

export const events: Record<string, Event> = {
  "0.0.777": {
    venue: "0.0.111",
    entertainer: "0.0.444",
    dateTime: new Date("2023-07-28T23:30:00Z"),
    ticketSalesBegin: new Date("2023-06-01T13:00:00Z"),
    ticketSalesEnd: new Date("2023-07-29T00:30:00Z"),
  },
  "0.0.888": {
    venue: "0.0.222",
    entertainer: "0.0.555",
    dateTime: new Date("2023-09-08T00:20:00Z"),
    ticketSalesBegin: new Date("2023-06-01T13:00:00Z"),
    ticketSalesEnd: new Date("2023-09-08T01:20:00Z"),
  },
  "0.0.999": {
    venue: "0.0.333",
    entertainer: "0.0.666",
    dateTime: new Date("2023-07-27T01:00:00Z"),
    ticketSalesBegin: new Date("2023-06-01T13:00:00Z"),
    ticketSalesEnd: new Date("2023-07-27T02:00:00Z"),
  },
};
