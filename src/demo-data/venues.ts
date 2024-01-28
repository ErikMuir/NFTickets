import { Venue } from "@/clients/db/models";

const seatKeys = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];
const rowKeys = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "AA",
  "BB",
  "CC",
  "DD",
];
const reservedSectionKeys = [
  "101",
  "102",
  "103",
  "104",
  "105",
  "106",
  "107",
  "108",
  "109",
  "110",
  "201",
  "202",
  "203",
  "204",
  "205",
  "206",
  "207",
  "208",
  "209",
  "210",
];
const reservedSectionRows = Object.fromEntries(
  rowKeys.map((key: string) => [key, seatKeys])
);
// const reservedSections = Object.fromEntries(reservedSectionKeys.map((key: string) => [key, reservedSectionRows]));
const reservedSections = {
  "101": 600,
  "102": 600,
  "103": 600,
  "104": 600,
  "105": 600,
  "106": 600,
  "107": 600,
  "108": 600,
  "109": 600,
  "110": 600,
  "201": 600,
  "202": 600,
  "203": 600,
  "204": 600,
  "205": 600,
  "206": 600,
  "207": 600,
  "208": 600,
  "209": 600,
  "210": 600,
  "301": 600,
  "302": 600,
  "303": 600,
  "304": 600,
  "305": 600,
  "306": 600,
  "307": 600,
  "308": 600,
  "309": 600,
  "310": 600,
};

export const venues: Record<string, Venue> = {
  "0.0.444": {
    id: "0c135a6d-563b-45f5-a870-6c163574866e",
    walletId: "",
    name: "Madison Square Garden",
    address: "4 Pennsylvania Plaza",
    city: "New York",
    state: "NY",
    zip: "10001",
    sections: {
      "FLOOR-A": 400,
      "FLOOR-B": 400,
      "FLOOR-C": 400,
      "FLOOR-D": 400,
      ...reservedSections,
    },
    createdAt: "2024-01-25T15:18:33Z",
    updatedAt: "2024-01-25T15:18:33Z",
  },
  "0.0.555": {
    id: "9ac54890-f9dc-4353-a77a-71cdf9d8441c",
    walletId: "",
    name: "Arrowhead Stadium",
    address: "1 Arrowhead Dr",
    city: "Kansas City",
    state: "MO",
    zip: "64129",
    sections: { ...reservedSections },
    createdAt: "2024-01-25T15:18:33Z",
    updatedAt: "2024-01-25T15:18:33Z",
  },
  "0.0.666": {
    id: "b8f55f1d-adf1-44e6-bb24-8594eddd2577",
    walletId: "",
    name: "The Moroccan Lounge",
    address: "901 East 1st Street",
    city: "Los Angeles",
    state: "CA",
    zip: "90012",
    sections: { GA: 250 },
    createdAt: "2024-01-25T15:18:33Z",
    updatedAt: "2024-01-25T15:18:33Z",
  },
};