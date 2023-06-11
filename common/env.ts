import dotenv from "dotenv";

dotenv.config();

export const getRequired = (key: string): string => {
  const value = `${process.env[key]}`;
  if (!value) {
    throw new Error(`No ${key} configured on the environment.`);
  }
  return value;
};

export const getOptional = (key: string, defaultValue?: string): string | undefined => {
  const value = `${process.env[key]}`;
  return value ?? defaultValue;
};
