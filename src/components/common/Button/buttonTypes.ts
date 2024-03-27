import { MouseEventHandler, ReactNode } from "react";

export type Size = "small" | "medium" | "large";
export const sizes: Size[] = ["small", "medium", "large"];

export type Variant = "contained" | "outlined" | "text";
export const variants: Variant[] = ["contained", "outlined", "text"];

export type Color =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";
export const colors: Color[] = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
];

export type ButtonProps = {
  className?: string;
  color?: Color;
  size?: Size;
  variant?: Variant;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
