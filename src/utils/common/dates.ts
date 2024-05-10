export type Date_ish = Date | string | number | null | undefined;

/**
 * Coerce a Date object from a `Date_ish` value.
 * Defaults to now if value is an empty string, null, or undefined.
 * @param {Date_ish} val - A value representing a date.
 * @returns {Date} Date object.
 */
export const toDate = (val: Date_ish): Date =>
  val === undefined || val === null || val === "" ? new Date() : new Date(val);

/**
 * Extract an array of date string parts from a `Date_ish` value.
 * Defaults to now if value is an empty string, null, or undefined.
 * @param {Date_ish} val - A value representing a date.
 * @returns {string[]} Array of date string parts: [day, month, date, year, time].
 */
export const toDateStringParts = (val: Date_ish): string[] => {
  const [day, month, date, year, time] = toDate(val).toString().split(" ");
  return [day, month, date, year, time];
};

/**
 * Convert a `Date_ish` value to a friendly date string (e.g. "Fri | Mar 22, 2024").
 * Defaults to now if value is an empty string, null, or undefined.
 * @param {Date_ish} val - A value representing a date.
 * @returns {string} Friendly-formatted date string.
 */
export const toFriendlyDate = (val: Date_ish): string => {
  const [day, month, date, year] = toDateStringParts(val);
  return `${day} | ${month} ${parseInt(date, 10)}, ${year}`;
};

/**
 * Convert a `Date_ish` value to a friendly time string (e.g. "7p" or "6:30a").
 * Defaults to now if value is an empty string, null, or undefined.
 * @param {Date_ish} val - A value representing a date.
 * @returns {string} Friendly-formatted time string.
 */
export const toFriendlyTime = (val: Date_ish): string => {
  const [, , , , time] = toDateStringParts(val);
  const [hour, minute] = time.split(":");
  let numericHour = parseInt(hour, 10);
  const period = numericHour < 12 ? "a" : "p";
  if (numericHour > 12) numericHour = numericHour - 12;
  if (numericHour === 0) numericHour = 12;
  const optionalMinute = minute === "00" ? "" : `:${minute}`;
  return `${numericHour}${optionalMinute}${period}`;
};

/**
 * Convert a `Date_ish` value to a friendly date and time string (e.g. "Fri | Mar 22, 2024 @ 7p").
 * Defaults to now if value is an empty string, null, or undefined.
 * @param {Date_ish} val - A value representing a date.
 * @returns {string} Friendly-formatted date and time string.
 */
export const toFriendlyDateTime = (val: Date_ish): string =>
  `${toFriendlyDate(val)} @ ${toFriendlyTime(val)}`;
