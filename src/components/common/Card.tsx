import Image from "next/image";
import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

export type CardProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  overlayText?: string;
  className?: string;
};

export const Card = ({
  title,
  subtitle,
  description,
  imageUrl,
  overlayText,
  className,
}: CardProps): ReactElement => {
  // TODO : implement overlay text
  const styles = twMerge(
    "w-full md:w-80 shadow-md rounded-md overflow-hidden bg-slate-50",
    className
  );
  const hasText = title || subtitle || description;
  return (
    <div className={styles}>
      {imageUrl && <Image src={imageUrl} className="w-full" width={1092} height={614} alt={imageUrl} />}
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
