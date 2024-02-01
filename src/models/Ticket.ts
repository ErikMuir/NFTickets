export type Ticket = {
  token: string;
  serial: number;
  venue: string;
  entertainer: string;
  event: string;
  section: string;
  scannedAt?: Date;
  scannedBy?: string;
};

export const mapTicket = ({
  token,
  serial,
  venue,
  entertainer,
  event,
  section,
  scanned_at,
  scanned_by,
}: any): Ticket => ({
  token,
  serial,
  venue,
  entertainer,
  event,
  section,
  scannedAt: scanned_at ? new Date(scanned_at) : undefined,
  scannedBy: scanned_by,
});
