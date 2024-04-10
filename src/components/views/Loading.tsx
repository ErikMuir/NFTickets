import { CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <div className="absolute top-1/2 left-0 w-full text-center -mt-[4rem]">
      <CircularProgress color="primary" size="4rem" />
    </div>
  );
}
