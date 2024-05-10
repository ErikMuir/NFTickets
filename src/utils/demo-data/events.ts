import type { Event } from "@/models";

export const events: Record<string, Event> = {
  phishAtMsg: {
    address: "0.0.777",
    venue: "0.0.444",
    entertainer: "0.0.111",
    dateTime: "2024-07-28T23:30:00Z",
    salesBegin: "2024-03-01T13:00:00Z",
    salesEnd: "2024-07-29T00:30:00Z",
    finalized: true,
  },
  chiefsAtArrowhead: {
    address: "0.0.888",
    venue: "0.0.555",
    entertainer: "0.0.222",
    dateTime: "2024-09-08T00:20:00Z",
    salesBegin: "2024-06-01T13:00:00Z",
    salesEnd: "2024-09-08T01:20:00Z",
    finalized: true,
  },
  heideckerAtMoroccan: {
    address: "0.0.999",
    venue: "0.0.666",
    entertainer: "0.0.333",
    dateTime: "2023-07-27T01:00:00Z",
    salesBegin: "2023-06-01T13:00:00Z",
    salesEnd: "2023-07-27T02:00:00Z",
    finalized: true,
  },
};
