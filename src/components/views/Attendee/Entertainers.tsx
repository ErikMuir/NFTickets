import { ReactElement } from "react";
import useEntertainers from "@/lib/useEntertainers";
import { Card } from "@/components/common/Card";
import Loading from "@/components/views/Loading";

export const Entertainers = (): ReactElement => {
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

  return <div>{getContent()}</div>;
};
