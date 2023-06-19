export const getRandom = <T>(arr: T[]): T => arr[new Date().getTime() % arr.length];

export const numericAscending = (a: number, b: number) => a - b;

export const numericDescending = (a: number, b: number) => b - a;

// we need this function because when a Uint8Array is stringified and then parsed,
// it results in an object where the keys are the array indices and the values are
// what we actually want
export function toUint8Array(value: Uint8Array | string | any) {
  if (value instanceof Uint8Array) return value;
  if (typeof value === "string") return new Uint8Array(Buffer.from(value));
  return new Uint8Array(Object.values(value));
}
