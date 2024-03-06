import { ReactElement } from "react";

export type CardProps = {
  image?: ReactElement;
  title?: string;
  subtitle?: string;
  description?: string;
};

export const Card = ({
  image,
  title,
  subtitle,
  description,
}: CardProps): ReactElement => {
  // TODO : fix the width issues
  return (
    <div className="!w-sm !md:max-w-md border p-4 rounded-md bg-slate-50">
      {image && <div className="">{image}</div>}
      {title?.length && <div className="text-xl text-center">{title}</div>}
      {subtitle?.length && <div className="text-md text-center">{subtitle}</div>}
      {description?.length && <div className="text-sm">{description}</div>}
    </div>
  );
};
