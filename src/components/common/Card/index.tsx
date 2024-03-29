import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import { CardProps } from "./cardTypes";
import { CardImage } from "./CardImage";

export const Card = ({
  title,
  subtitle,
  description,
  imageUrl,
  overlayText,
  className,
}: CardProps): ReactElement => {
  const styles = twMerge(
    "w-full md:w-80 shadow-md rounded-md overflow-hidden bg-slate-50",
    className
  );
  const hasText = title || subtitle || description;
  return (
    <div className={styles}>
      {imageUrl && <CardImage imageUrl={imageUrl} overlayText={overlayText}  />}
      {hasText && (
        <div className="p-2 bg-neutral-100">
          {title && <div className="text-xl text-center">{title}</div>}
          {subtitle && <div className="text-md text-center">{subtitle}</div>}
          {description && <div className="text-sm text-center">{description}</div>}
        </div>
      )}
    </div>
  );
};
