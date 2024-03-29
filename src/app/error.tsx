"use client";

import { useEffect } from "react";
import { Button } from "@/components/common/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-4 items-center mt-16">
      <div className="text-xl">Something went wrong!</div>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
