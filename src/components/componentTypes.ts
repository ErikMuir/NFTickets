import { ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";

export type Hidable = {
  isHidden?: boolean;
};

export type AccountProp = {
  account: string;
};

export type BaseFormControlProps = {
  id: string;
  label?: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
};

export type TextFormControlProps = BaseFormControlProps & {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export type SelectValue = string | number | readonly string[] | undefined;

export type SelectFormControlProps = BaseFormControlProps & {
  options: Record<string, SelectValue>;
  value?: SelectValue;
  onChange?: (e: SelectChangeEvent) => void;
};
