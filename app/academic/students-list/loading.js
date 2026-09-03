import { PageHeaderSkeleton, Shimmer } from "@/components/loading/Skeleton";

const StudentsListLoadingPage = () => {
  return (
    <main className="container py-4 animate-pulse">
      <PageHeaderSkeleton titleWidth="w-48" descWidth="w-72" />

      <div className="gov-panel overflow-hidden">
        <div className="bg-primary px-4 py-2.5 flex gap-4">
          <Shimmer className="h-4 w-20 bg-primary-600/40" />
          <Shimmer className="h-4 w-24 bg-primary-600/40" />
          <Shimmer className="h-4 w-16 bg-primary-600/40" />
          <Shimmer className="h-4 w-20 bg-primary-600/40" />
        </div>
        <div className="divide-y divide-slate-200">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 px-4 py-3 items-center"
            >
              <Shimmer className="h-3.5 w-full" />
              <Shimmer className="h-3.5 w-20" />
              <Shimmer className="h-3.5 w-12" />
              <Shimmer className="h-3.5 w-16" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default StudentsListLoadingPage;
