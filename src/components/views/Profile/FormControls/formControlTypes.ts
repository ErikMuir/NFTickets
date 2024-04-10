import { Dispatch, SetStateAction } from "react";

export type FormControlProps<T> = {
  value?: T;
  setValue: Dispatch<SetStateAction<T>>
};
