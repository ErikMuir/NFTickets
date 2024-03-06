import type { Event } from "@/models";

export const events: Record<string, Event> = {
  phishAtMsg: {
    address: "0.0.777",
    venue: "0.0.444",
    entertainer: "0.0.111",
    dateTime: new Date("2024-07-28T23:30:00Z"),
    ticketSalesBegin: new Date("2024-06-01T13:00:00Z"),
    ticketSalesEnd: new Date("2024-07-29T00:30:00Z"),
  },
  chiefsAtArrowhead: {
    address: "0.0.888",
    venue: "0.0.555",
    entertainer: "0.0.222",
    dateTime: new Date("2024-09-08T00:20:00Z"),
    ticketSalesBegin: new Date("2024-06-01T13:00:00Z"),
    ticketSalesEnd: new Date("2024-09-08T01:20:00Z"),
  },
  heideckerAtMoroccan: {
    address: "0.0.999",
    venue: "0.0.666",
    entertainer: "0.0.333",
    dateTime: new Date("2023-07-27T01:00:00Z"),
    ticketSalesBegin: new Date("2023-06-01T13:00:00Z"),
    ticketSalesEnd: new Date("2023-07-27T02:00:00Z"),
  },
};
