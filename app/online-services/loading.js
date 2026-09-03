import { Shimmer } from "@/components/loading/Skeleton";

export default function OnlineServicesLoading() {
  return (
    <section className="container py-4 animate-pulse">
      <div className="gov-panel">
        <div className="bg-primary px-3 py-2.5">
          <Shimmer className="h-5 w-36 bg-primary-600/40" />
        </div>
        <div className="p-3">
          <Shimmer className="h-3.5 w-64 mb-3" />
          <ul className="divide-y divide-slate-200 border border-slate-200">
            {[...Array(6)].map((_, i) => (
              <li key={i} className="flex items-start gap-3 px-3 py-3">
                <Shimmer className="size-5 rounded-full shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1.5">
                  <Shimmer className="h-4 w-40" />
                  <Shimmer className="h-3 w-full max-w-md" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
