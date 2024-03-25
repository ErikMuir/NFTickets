import { ReactElement } from "react";
import { CircularProgress } from "@mui/material";
import useVenues from "@/lib/useVenues";
import { Card } from "@/components/common/Card";

export const Venues = (): ReactElement => {
  const { data: venues, isLoading } = useVenues();

  const getContent = (): ReactElement => {
    if (isLoading) return <CircularProgress size="1.5rem" />;

    if (!venues?.length)
      return <div className="text-md italic">No entertainers</div>;

    return (
      <div className="flex flex-wrap items-start gap-8">
        {venues.map(({ account, name, imageUrl }) => (
          <Card
            key={account}
            title={name}
            imageUrl={imageUrl}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* <div className="text-sm uppercase mb-2">Venues</div> */}
      {getContent()}
    </div>
  );
};
