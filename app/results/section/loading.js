import { PageHeaderSkeleton, Shimmer } from "@/components/loading/Skeleton";

export default function SectionResultLoading() {
  return (
    <section className="container py-4 animate-pulse">
      <PageHeaderSkeleton titleWidth="w-44" descWidth="w-72" />

      <div className="gov-panel p-3 mb-3">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i}>
              <Shimmer className="h-3.5 w-20 mb-2" />
              <Shimmer className="h-10 w-full" />
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <Shimmer className="h-10 w-28 bg-primary/30" />
          <Shimmer className="h-10 w-28" />
        </div>
      </div>

      <div className="gov-panel overflow-hidden">
        <div className="bg-primary px-4 py-2.5">
          <Shimmer className="h-4 w-40 bg-primary-600/40" />
        </div>
        <div className="divide-y divide-slate-200">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="px-4 py-3">
              <Shimmer className="h-3.5 w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
