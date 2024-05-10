import { type Entertainer, EntertainerType } from "@/models";

export const entertainers: Record<string, Entertainer> = {
  phish: {
    account: "0.0.111",
    name: "Phish",
    type: EntertainerType.MUSIC,
    description:
      "Phish will embark on a 26-date Summer Tour (including their 4-day Mondegreen Festival) this July, August, and September.",
    iteration: "Summer Tour 2024",
    imageUrl: "/phish-press.png",
  },
  chiefs: {
    account: "0.0.222",
    name: "Kansas City Chiefs",
    type: EntertainerType.SPORTS,
    description:
      "Head Coach Andy Reid leads the returning Super Bowl champion Kansas City Chiefs into the 2024 season captained by the top quarterback in the NFL, Patrick Mahomes.",
    iteration: "2024 NFL Season",
    imageUrl: "/chiefs-press.png",
  },
  heidecker: {
    account: "0.0.333",
    name: "Tim Heidecker",
    type: EntertainerType.COMEDY,
    description:
      'Tim Heidecker is bringing his "No More Bullshit" stand-up character as well as The Very Good Band (with fan favorite Vic Berger) back to the USA for a brand new Summer Tour!',
    iteration: "The Two Tims Tour '23",
    imageUrl: "/heidecker-press.png",
  },
};
