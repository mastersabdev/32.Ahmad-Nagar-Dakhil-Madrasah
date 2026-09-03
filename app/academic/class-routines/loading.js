import { PageHeaderSkeleton, Shimmer } from "@/components/loading/Skeleton";

const ClassRoutineLoadingPage = () => {
  return (
    <main className="container py-4 animate-pulse">
      <PageHeaderSkeleton titleWidth="w-36" descWidth="w-80" />

      <div className="gov-panel overflow-hidden">
        <div className="bg-primary px-4 py-2.5 flex gap-4">
          <Shimmer className="h-4 w-28 bg-primary-600/40" />
          <Shimmer className="h-4 w-16 bg-primary-600/40" />
          <Shimmer className="h-4 w-32 bg-primary-600/40" />
          <Shimmer className="h-4 w-20 bg-primary-600/40" />
        </div>
        <div className="divide-y divide-slate-200">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 px-4 py-3 items-center"
            >
              <Shimmer className="h-3.5 w-full" />
              <Shimmer className="h-3.5 w-16" />
              <Shimmer className="h-3.5 w-24" />
              <div className="flex gap-1">
                <Shimmer className="size-8 bg-primary/25" />
                <Shimmer className="size-8 bg-secondary/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ClassRoutineLoadingPage;
