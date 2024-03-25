import { PropsWithChildren, ReactElement } from "react";
import { Button as MuiButton } from "@mui/material";
import { twMerge } from "tailwind-merge";

export type Size = "small" | "medium" | "large";
export type Color = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";

export type ButtonProps = {
  className?: string;
  classes?: object;
  color?: Color;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: Size;
  onClick?: () => void;
};

export const Button = ({
  className,
  classes,
  disabled,
  fullWidth,
  size = "medium",
  onClick,
  children,
}: PropsWithChildren<ButtonProps>): ReactElement => {
  const styles = twMerge(
    // "px-4 py-2",
    className,
  );
  return (
    <MuiButton
      className={className}
      classes={classes}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};
