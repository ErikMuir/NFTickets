import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import useVenues from "@/lib/useVenues";
import { Card } from "@/components/common/Card";
import { Loading } from "@/components/views/Loading";
import { Hidable } from "@/components/componentTypes";

export const Venues = ({ isHidden }: Hidable): ReactElement => {
  const { data: venues, isLoading } = useVenues();

  const getContent = (): ReactElement => {
    if (isLoading) return <Loading />;

    if (!venues?.length) return <div className="text-md italic">No venues</div>;

    return (
      <div className="flex flex-wrap items-start gap-8">
        {venues.map(({ account, name, imageUrl }) => (
          <Card key={account} title={name} imageUrl={imageUrl} />
        ))}
      </div>
    );
  };

  return <div className={twMerge(isHidden && "hidden")}>{getContent()}</div>;
};
