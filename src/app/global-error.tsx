"use client";

import { Button } from "@/components/common/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col gap-4 items-center mt-16">
          <div className="text-xl">Something went wrong!</div>
          <Button onClick={reset}>Try again</Button>
        </div>
      </body>
    </html>
  );
}
