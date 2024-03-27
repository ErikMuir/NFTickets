export type Venue = {
  account: string;
  name: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  imageUrl?: string;
  sections?: Record<string, number>; // TODO : do we need this?
};

export const mapVenue = ({
  account,
  name,
  description,
  address,
  city,
  state,
  zip,
  image_url,
}: any): Venue => ({
  account,
  name,
  description,
  address,
  city,
  state,
  zip,
  imageUrl: image_url,
  sections: {},
});
