export type Date_ish = Date | string | number | undefined | null;

const toFriendlyDate = (val: Date_ish): string => {
  const datetime = new Date(val || 0);
  const [day, month, date, year] = new Date(datetime).toString().split(" ");
  return `${day}, ${month} ${parseInt(date, 10)}, ${year}`;
};

const toFriendlyTime = (val: Date_ish): string => {
  const datetime = new Date(val || 0);
  const [, , , , time] = new Date(datetime).toString().split(" ");
  const [hour, minute] = time.split(":");
  let numericHour = parseInt(hour, 10);
  const period = numericHour < 12 ? "a" : "p";
  if (numericHour > 12) numericHour = numericHour - 12;
  if (numericHour === 0) numericHour = 12;
  const optionalMinute = minute === "00" ? "" : `:${minute}`;
  return `${numericHour}${optionalMinute}${period}`;
};

export const toFriendlyDateTime = (val: Date_ish): string => {
  // Fri, Mar 22 @ 7p
  return `${toFriendlyDate(val)} @ ${toFriendlyTime(val)}`;
};
