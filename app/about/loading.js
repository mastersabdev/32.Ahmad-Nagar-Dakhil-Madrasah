import { Shimmer } from "@/components/loading/Skeleton";

const AboutLoadingPage = () => {
  return (
    <section className="container py-4 space-y-3 animate-pulse">
      <div className="gov-panel">
        <div className="bg-primary px-3 py-2.5 flex justify-center">
          <Shimmer className="h-5 w-56 bg-primary-600/40" />
        </div>
        <div className="px-4 py-3 border-b border-slate-200 flex justify-center">
          <Shimmer className="h-3.5 w-3/4 max-w-lg" />
        </div>
      </div>

      <Shimmer className="h-52 sm:h-[40vh] w-full border border-slate-300" />

      <div className="gov-panel">
        <div className="bg-primary px-3 py-2">
          <Shimmer className="h-4 w-40 bg-primary-600/40" />
        </div>
        <div className="p-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border border-slate-200 bg-slate-50 px-3 py-2.5"
            >
              <Shimmer className="h-3.5 w-20" />
              <Shimmer className="h-3.5 w-28" />
            </div>
          ))}
        </div>
      </div>

      <div className="gov-panel">
        <div className="bg-primary px-3 py-2">
          <Shimmer className="h-4 w-24 bg-primary-600/40" />
        </div>
        <div className="p-3 space-y-2">
          {[...Array(6)].map((_, i) => (
            <Shimmer
              key={i}
              className={`h-3.5 ${i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-11/12" : "w-4/5"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutLoadingPage;
