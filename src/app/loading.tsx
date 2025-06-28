import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container py-8 flex flex-col gap-4 mx-auto h-screen w-screen">
      <Skeleton className="w-1/5 h-8" />
      <div className="grid grid-cols-2 gap-4 flex-1">
        <Skeleton className="w-full h-full" />
        <div className="flex flex-col gap-4">
          <Skeleton className="w-full h-full" />
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    </main>
  );
}
