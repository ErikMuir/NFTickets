import { ReactElement } from "react";
import { CircularProgress } from "@mui/material";
import useEntertainers from "@/lib/useEntertainers";
import { Card } from "@/components/common/Card";
import Image from "next/image";

export const Entertainers = (): ReactElement => {
  const { data: entertainers, isLoading } = useEntertainers();

  const getContent = (): ReactElement => {
    if (isLoading) return <CircularProgress size="1.5rem" />;

    if (!entertainers?.length)
      return <div className="text-md italic">No entertainers</div>;

    return (
      <div className="flex flex-wrap items-start gap-8">
        {entertainers.map(
          ({ account, name, imageUrl }) => (
            <Card
              key={account}
              imageUrl={imageUrl}
              title={name}
            />
          )
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="text-sm uppercase mb-2">Entertainers</div>
      {getContent()}
    </div>
  );
};
