export type Section = {
  venue: string;
  section: string;
  capacity: number;
};

export const mapSection = ({ venue, section, capacity }: any): Section => ({
  venue,
  section,
  capacity,
});
