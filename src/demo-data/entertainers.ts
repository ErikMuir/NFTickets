import { Entertainer } from "@/clients/db/models";
import { EntertainerType } from "@/clients/db/types";

export const entertainers: Record<string, Entertainer> = {
  "0.0.111": {
    id: "ffc52a8f-3d2a-4f3b-9c41-ee1cd9fcf290",
    walletId: "",
    name: "Phish",
    type: EntertainerType.MUSIC,
    description:
      "Phish will embark on a 23-date Summer Tour beginning July 11 and culminating with their traditional Labor Day Weekend run at Dick's Sporting Goods Park in Commerce City, CO, where they'll return for four nights. The tour includes a seven-night run at New York City's Madison Square Garden.",
    iteration: "Summer Tour 2023",
    createdAt: "2024-01-25T15:18:33Z",
    updatedAt: "2024-01-25T15:18:33Z",
  },
  "0.0.222": {
    id: "cbd2987d-6202-4764-9b73-f5e1078c3c10",
    walletId: "",
    name: "Kansas City Chiefs",
    type: EntertainerType.SPORTS,
    description:
      "Head Coach Andy Reid leads the returning Super Bowl champion Kansas City Chiefs into the 2023 season captained by the top quarterback in the NFL, Patrick Mahomes.",
    iteration: "2023 NFL Season",
    createdAt: "2024-01-25T15:18:33Z",
    updatedAt: "2024-01-25T15:18:33Z",
  },
  "0.0.333": {
    id: "0df4aec3-dfa3-422e-8838-ef539d35ba53",
    walletId: "",
    name: "Tim Heidecker",
    type: EntertainerType.COMEDY,
    description:
      'Tim Heidecker is bringing his "No More Bullshit" stand-up character as well as The Very Good Band (with fan favorite Vic Berger) back to the USA for a brand new Summer Tour!',
    iteration: "The Two Tims Summer Tour '23",
    createdAt: "2024-01-25T15:18:33Z",
    updatedAt: "2024-01-25T15:18:33Z",
  },
};
