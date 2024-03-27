import { PropsWithChildren, ReactElement } from "react";
import { Button as MuiButton } from "@mui/material";
import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./buttonTypes";

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
    className,
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
