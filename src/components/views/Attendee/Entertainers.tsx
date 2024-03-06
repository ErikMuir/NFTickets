import { ReactElement } from "react";
import { CircularProgress } from "@mui/material";
import useEntertainers from "@/lib/useEntertainers";
import { Card } from "@/components/common/Card";

export const Entertainers = (): ReactElement => {
  const { data: entertainers, isLoading } = useEntertainers();

  const getContent = (): ReactElement => {
    if (isLoading) return <CircularProgress size="1.5rem" />;

    if (!entertainers?.length)
      return <div className="text-md italic">No entertainers</div>;

    return (
      <div className="flex flex-wrap items-start overflow-x-auto gap-8">
        {entertainers.map((entertainer) => (
          <Card
            key={entertainer.account}
            title={entertainer.name}
            subtitle={entertainer.iteration}
            description={entertainer.description}
          />
        ))}
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
