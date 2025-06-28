"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-6xl mb-4">🍎</div>
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved or doesn&apos;t exist.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/">Go back home</Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go back
          </Button>
        </div>
      </div>
    </main>
  );
}
