import { ProfileCardSkeleton, Shimmer } from "@/components/loading/Skeleton";

const RootLoader = () => {
  return (
    <div className="container py-3 space-y-3 animate-pulse">
      {/* Slider */}
      <div className="relative border border-slate-300 overflow-hidden">
        <Shimmer className="w-full h-[220px] sm:h-[320px] bg-primary-50" />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 size-7 bg-primary/40" />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 size-7 bg-primary/40" />
      </div>

      {/* 3-column board layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_200px] gap-3 items-start">
        {/* Services */}
        <div className="gov-panel">
          <div className="bg-slate-200 px-3 py-2 border-b border-slate-300">
            <Shimmer className="h-4 w-28 bg-slate-300" />
          </div>
          <ul className="divide-y divide-slate-200">
            {[...Array(6)].map((_, i) => (
              <li key={i} className="flex items-center gap-2 px-3 py-2.5">
                <Shimmer className="size-5 rounded-full shrink-0" />
                <Shimmer className="h-3.5 flex-1" />
              </li>
            ))}
          </ul>
        </div>

        {/* Welcome + Notice */}
        <div className="space-y-3 min-w-0">
          <div className="gov-panel p-3">
            <Shimmer className="h-5 w-3/4 max-w-md" />
          </div>
          <div className="gov-panel">
            <div className="bg-primary px-3 py-2">
              <Shimmer className="h-4 w-20 bg-primary-600/40" />
            </div>
            <ul className="divide-y divide-slate-200 p-2">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="flex items-start justify-between gap-2 px-2 py-2.5">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <span className="mt-1 size-2.5 shrink-0 bg-accent" />
                    <div className="space-y-1.5 flex-1">
                      <Shimmer className="h-3.5 w-full" />
                      <Shimmer className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    <Shimmer className="w-8 h-7 bg-primary/30" />
                    <Shimmer className="w-8 h-7 bg-secondary/50" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Officials */}
        <aside className="space-y-3">
          <ProfileCardSkeleton />
          <ProfileCardSkeleton />
        </aside>
      </div>

      {/* About */}
      <div className="gov-panel">
        <div className="bg-primary px-3 py-2">
          <Shimmer className="h-4 w-24 bg-primary-600/40" />
        </div>
        <div className="p-3 space-y-2">
          <Shimmer className="h-4 w-40" />
          {[...Array(4)].map((_, i) => (
            <Shimmer key={i} className={`h-3.5 ${i === 3 ? "w-2/3" : "w-full"}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RootLoader;
