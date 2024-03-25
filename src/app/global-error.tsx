"use client";

import { Button } from "@mui/material";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="p-12 flex flex-col items-center justify-start">
        <h2 className="text-2xl">Something went wrong!</h2>
        <Button variant="contained">Try again</Button>
        <button type="button" className="" onClick={reset}>Try again</button>
      </body>
    </html>
  );
}
