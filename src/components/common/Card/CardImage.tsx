import Image from "next/image";
import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import { CardImageProps } from "./cardTypes";

export const CardImage = ({
  imageUrl,
  overlayText,
  className,
}: CardImageProps): ReactElement => {
  const containerClassName = twMerge("w-80 relative", className);
  const imageClassName = overlayText ? "-z-10 opacity-30" : "w-full";
  const overlayClassName = twMerge(
    "absolute top-0 left-0 right-0 bottom-0",
    "text-4xl text-center text-gray-dark uppercase",
    "self-center"
  );

  return (
    <div className={containerClassName}>
      <Image
          src={imageUrl}
          className={imageClassName}
          width={1092}
          height={614}
          alt={imageUrl}
        />
        {overlayText && <div className={overlayClassName}>{overlayText}</div>}
    </div>
  );
};
