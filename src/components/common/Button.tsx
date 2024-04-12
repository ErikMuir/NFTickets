import {
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import { Button as MuiButton } from "@mui/material";
import { twMerge } from "tailwind-merge";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonVariant = "contained" | "outlined" | "text";
export type ButtonColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

export type ButtonProps = {
  className?: string;
  color?: ButtonColor;
  size?: ButtonSize;
  variant?: ButtonVariant;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({
  className = "",
  color = "primary",
  size = "medium",
  variant = "contained",
  startIcon,
  endIcon,
  disabled = false,
  fullWidth = false,
  onClick,
  children,
}: PropsWithChildren<ButtonProps>): ReactElement => {
  const styles = twMerge(
    "self-center",
    variant === "contained" && color === "secondary" && "text-white",
    className
  );
  return (
    <MuiButton
      className={styles}
      color={color}
      size={size}
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};
