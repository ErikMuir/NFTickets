import { Entertainer, EntertainerType } from "@/types";

export const entertainers: Entertainer[] = [
  {
    name: "Phish",
    type: EntertainerType.Music,
    description: "Phish will embark on a 23-date Summer Tour beginning July 11 and culminating with their traditional Labor Day Weekend run at Dick's Sporting Goods Park in Commerce City, CO, where they'll return for four nights. The tour includes a seven-night run at New York City's Madison Square Garden.",
    currentIteration: "Summer Tour 2023",
  },
  {
    name: "Kansas City Chiefs",
    type: EntertainerType.Sports,
    description: "",
    currentIteration: "2023 NFL Season"
  },
  {
    name: "Tim Heidecker",
    type: EntertainerType.Comedy,
    description: "",
    currentIteration: "The Two Tims Summer Tour '23",
  },
];
