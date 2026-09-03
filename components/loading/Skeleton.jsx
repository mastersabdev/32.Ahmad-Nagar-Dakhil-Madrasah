import { cn } from "@/lib/utils";

export const Shimmer = ({ className = "" }) => (
  <div
    className={cn(
      "relative overflow-hidden bg-primary-100",
      className
    )}
  >
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-12deg]" />
  </div>
);

export const PageHeaderSkeleton = ({ titleWidth = "w-48", descWidth = "w-72" }) => (
  <div className="gov-panel mb-3">
    <div className="bg-primary px-3 py-2.5">
      <Shimmer className={cn("h-5 bg-primary-600/40", titleWidth)} />
    </div>
    <div className="px-3 py-2 border-t border-slate-200">
      <Shimmer className={cn("h-3.5", descWidth)} />
    </div>
  </div>
);

export const ProfileCardSkeleton = () => (
  <div className="gov-panel border-t-4 border-b-4 border-t-primary border-b-primary text-center p-3">
    <Shimmer className="mx-auto size-28 rounded-full mb-3" />
    <Shimmer className="h-4 w-3/4 mx-auto mb-2" />
    <Shimmer className="h-3 w-1/2 mx-auto" />
  </div>
);

export default Shimmer;
