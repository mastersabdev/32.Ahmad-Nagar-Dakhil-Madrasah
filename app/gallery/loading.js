import { PageHeaderSkeleton, Shimmer } from "@/components/loading/Skeleton";

export default function Loading() {
  return (
    <section className="container py-4 animate-pulse">
      <PageHeaderSkeleton titleWidth="w-28" descWidth="w-64" />

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="gov-panel overflow-hidden">
            <Shimmer className="h-44 md:h-48 w-full" />
            <div className="p-3 space-y-2">
              <Shimmer className="h-3.5 w-3/4" />
              <Shimmer className="h-3 w-1/2" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
