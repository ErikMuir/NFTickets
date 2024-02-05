import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="absolute top-1/2 w-full text-center -mt-[4rem]">
      <CircularProgress color="primary" size="4rem" />
    </div>
  );
}
