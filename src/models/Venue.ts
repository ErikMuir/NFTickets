export type Venue = {
  account: string;
  name: string;
  description?: string;
  location?: string;
  imageUrl?: string;
  sections?: Record<string, number>; // TODO : do we need this?
};

export const mapVenue = ({
  account,
  name,
  description,
  location,
  image_url,
}: any): Venue => ({
  account,
  name,
  description,
  location,
  imageUrl: image_url,
  sections: {},
});
