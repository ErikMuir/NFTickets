import { EventStatus } from "@/models/Event";

export const getEventStatusClassName = (status: EventStatus): string => {
  switch (status) {
    case EventStatus.Unfinalized:
      return "text-secondary";
    case EventStatus.PreSales:
      return "text-warning";
    case EventStatus.OpenSales:
      return "text-success";
    case EventStatus.PostSales:
      return "text-primary";
    case EventStatus.PastEvent:
      return "text-default";
    case EventStatus.Unknown:
      return "text-error";
    default:
      throw new Error(`Unrecognized event status: '${status}'`);
  }
};
