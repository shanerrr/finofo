"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-6xl mb-4">🚨</div>
        <h1 className="text-2xl font-bold text-destructive">
          Something went wrong!
        </h1>
        <p className="text-muted-foreground">
          We encountered an unexpected error. Please try again.
        </p>
        {process.env.NODE_ENV === "development" && (
          <details className="text-left bg-muted p-4 rounded-lg">
            <summary className="cursor-pointer font-medium mb-2">
              Error Details (Development)
            </summary>
            <pre className="text-xs overflow-auto">{error.message}</pre>
          </details>
        )}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
          >
            Try again
          </Button>
        </div>
      </div>
    </main>
  );
}
