import { twMerge } from "tailwind-merge";

export type ErrorMessageProps = {
  message?: string;
  className?: string;
};

export const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
  return (
    <div className={twMerge("text-error text-sm h-5", className)}>
      {message}
    </div>
  );
};
