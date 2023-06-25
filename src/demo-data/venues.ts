import { Venue } from "@/types";

const seatKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
const rowKeys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "AA", "BB", "CC", "DD"];
const reservedSectionKeys = ["101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "201", "202", "203", "204", "205", "206", "207", "208", "209", "210"];
const reservedSectionRows = Object.fromEntries(rowKeys.map((key: string) => [key, seatKeys]));
const reservedSections = Object.fromEntries(reservedSectionKeys.map((key: string) => [key, reservedSectionRows]));

export const venues: Record<string, Venue> = {
  "0.0.444": {
    name: "Madison Square Garden",
    address: "4 Pennsylvania Plaza",
    city: "New York",
    state: "NY",
    zip: "10001",
    openSections: {
      "FLOOR-A": 400,
      "FLOOR-B": 400,
      "FLOOR-C": 400,
      "FLOOR-D": 400,
    },
    reservedSections,
  },
  "0.0.555": {
    name: "Arrowhead Stadium",
    address: "",
    city: "",
    state: "MO",
    zip: "",
    reservedSections,
  },
  "0.0.666": {
    name: "The Moroccan Lounge",
    address: "901 East 1st Street",
    city: "Los Angeles",
    state: "CA",
    zip: "90012",
    openSections: {
      "GA": 250,
    },
  },
};
