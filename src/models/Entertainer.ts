import { knownLookup } from "@/utils/common/enums";

export enum EntertainerType {
  UNKNOWN = "n/a",
  MUSIC = "Music",
  SPORTS = "Sports",
  COMEDY = "Comedy",
}

export type Entertainer = {
  account: string;
  type: EntertainerType;
  name: string;
  description?: string;
  iteration?: string;
  imageUrl?: string;
};

export const mapEntertainer = ({
  account,
  type,
  name,
  description,
  iteration,
  image_url,
}: any): Entertainer => ({
  account,
  type: knownLookup(EntertainerType, type),
  name,
  description: description || undefined,
  iteration: iteration || undefined,
  imageUrl: image_url || undefined,
});
