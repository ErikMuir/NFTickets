export type EventFunctionCall = (
  address: string,
  caller: string,
  ...args: string[]
) => Promise<boolean>;

export const setDateTime: EventFunctionCall = async (
  address: string,
  caller: string,
  dateTime: string
): Promise<boolean> => {
  /* wallet calls contract function */
  throw new Error("Not Implemented.");
};

export const setSalesBegin: EventFunctionCall = async (
  address: string,
  caller: string,
  salesBegin: string
): Promise<boolean> => {
  /* wallet calls contract function */
  throw new Error("Not Implemented.");
};

export const setSalesEnd: EventFunctionCall = async (
  address: string,
  caller: string,
  salesEnd: string
): Promise<boolean> => {
  /* wallet calls contract function */
  throw new Error("Not Implemented.");
};
