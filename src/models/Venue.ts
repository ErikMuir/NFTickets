export type Venue = {
  account: string;
  name: string;
  description?: string;
  location?: string;
  sections?: Record<string, number>;
};

export const mapVenue = ({
  account,
  name,
  description,
  location,
}: any): Venue => ({
  account,
  name,
  description,
  location,
  sections: {},
});
