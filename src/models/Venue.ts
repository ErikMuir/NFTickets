export type Venue = {
  account: string;
  name: string;
  description?: string;
  location?: string;
  sections?: Record<string, number>; // TODO : do we need this?
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
