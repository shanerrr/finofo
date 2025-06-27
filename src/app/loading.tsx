import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="container mx-auto h-screen flex flex-col gap-4 py-8">
      <header>
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          I ❤️ Fruits!
        </h1>
        <p className="text-center text-sm text-muted-foreground">by Shane</p>
      </header>
      <section className="flex gap-4">
        <div className="h-10 w-32 bg-muted animate-pulse rounded-md" />
        <div className="h-10 w-48 bg-muted animate-pulse rounded-md" />
      </section>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Loading fruits...</p>
        </div>
      </div>
    </main>
  );
} 