import { PageHeaderSkeleton, Shimmer } from "@/components/loading/Skeleton";

export default function SingleResultLoading() {
  return (
    <section className="container py-4 animate-pulse">
      <PageHeaderSkeleton titleWidth="w-32" descWidth="w-80" />

      <div className="gov-panel p-3 mb-3">
        <div className="grid gap-3 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <Shimmer className="h-3.5 w-24 mb-2" />
              <Shimmer className="h-10 w-full" />
            </div>
          ))}
        </div>
        <Shimmer className="h-10 w-32 mt-3 bg-primary/30" />
      </div>

      <div className="gov-panel p-4 space-y-2">
        {[...Array(5)].map((_, i) => (
          <Shimmer key={i} className={`h-4 ${i === 4 ? "w-2/3" : "w-full"}`} />
        ))}
      </div>
    </section>
  );
}
