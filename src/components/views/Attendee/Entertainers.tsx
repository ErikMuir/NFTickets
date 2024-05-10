import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import useEntertainers from "@/lib/entertainers/useEntertainers";
import { Card } from "@/components/common/Card";
import { Loading } from "@/components/common/Loading";
import { Hidable } from "@/components/component-types";

export const Entertainers = ({ isHidden }: Hidable): ReactElement => {
  const { data: entertainers, isLoading } = useEntertainers();

  const getContent = (): ReactElement => {
    if (isLoading) return <Loading />;

    if (!entertainers?.length)
      return <div className="text-md italic">No entertainers</div>;

    return (
      <div className="flex flex-wrap items-start gap-8">
        {entertainers.map(({ account, name, imageUrl }) => (
          <Card key={account} imageUrl={imageUrl} title={name} />
        ))}
      </div>
    );
  };

  return <div className={twMerge(isHidden && "hidden")}>{getContent()}</div>;
};
