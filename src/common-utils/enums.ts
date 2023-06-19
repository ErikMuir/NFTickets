type StringEnum = { [key: string]: any };
type NumericEnum = { [key: number]: any };
type AllTheEnums = StringEnum | NumericEnum;
function keysOf<K extends {}>(o: K): (keyof K)[];
function keysOf(o: any) {
  return Object.keys(o);
}

function stringLookup<E extends StringEnum>(stringEnum: E, s: string): E[keyof E] | undefined {
  for (const enumKey of keysOf(stringEnum)) {
    if (stringEnum[enumKey] === s) {
      return stringEnum[enumKey] as E[keyof E];
    }
  }
  return undefined;
}

function numericLookup<E extends NumericEnum>(numericEnum: E, n: number): E[keyof E] | undefined {
  for (const enumKey of keysOf(numericEnum)) {
    if (numericEnum[enumKey] === n) {
      return numericEnum[enumKey] as E[keyof E];
    }
  }
  return undefined;
}

export function lookup<E extends NumericEnum>(someEnum: E, v: number): E[keyof E] | undefined;
export function lookup<E extends StringEnum>(someEnum: E, v: string): E[keyof E] | undefined;
export function lookup<E extends AllTheEnums>(
  someEnum: E,
  v: string | number
): E[keyof E] | undefined {
  if (typeof v === "string") {
    return stringLookup(someEnum, v);
  }
  if (typeof v === "number") {
    return numericLookup(someEnum, v);
  }
  return undefined;
}

export function knownLookup<E extends NumericEnum>(someEnum: E, v: number): E[keyof E];
export function knownLookup<E extends StringEnum>(someEnum: E, v: string): E[keyof E];
export function knownLookup<E extends AllTheEnums>(someEnum: E, v: string | number): E[keyof E] {
  const lookupValue = typeof v === "string" ? lookup(someEnum, v) : lookup(someEnum, v);
  if (typeof lookupValue !== "undefined") {
    return lookupValue;
  }
  throw new Error(`Known value didn't exist, ${v}`);
}

export function randomEnumValue(someEnum: any): any {
  const keys = Object.keys(someEnum);
  const enumKey = keys[Math.floor(Math.random() * keys.length)];
  return someEnum[enumKey];
}
