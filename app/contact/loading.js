import { Shimmer } from "@/components/loading/Skeleton";

const ContactLoadingPage = () => {
  return (
    <main className="container py-4 animate-pulse">
      <div className="gov-panel mb-3">
        <div className="bg-primary px-3 py-2.5">
          <Shimmer className="h-5 w-28 bg-primary-600/40" />
        </div>
        <div className="px-3 py-2">
          <Shimmer className="h-3.5 w-48" />
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div className="gov-panel">
          <div className="bg-primary px-3 py-2">
            <Shimmer className="h-4 w-36 bg-primary-600/40" />
          </div>
          <div className="p-3 space-y-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border border-slate-200 bg-slate-50 p-3"
              >
                <Shimmer className="size-10 shrink-0 bg-primary/20" />
                <div className="flex-1 space-y-1.5">
                  <Shimmer className="h-3.5 w-16" />
                  <Shimmer className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gov-panel">
          <div className="bg-primary px-3 py-2">
            <Shimmer className="h-4 w-32 bg-primary-600/40" />
          </div>
          <div className="p-3 space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item}>
                <Shimmer className="h-3.5 w-16 mb-2" />
                <Shimmer className="h-10 w-full" />
              </div>
            ))}
            <div>
              <Shimmer className="h-3.5 w-16 mb-2" />
              <Shimmer className="h-28 w-full" />
            </div>
            <Shimmer className="h-10 w-full bg-primary/30" />
          </div>
        </div>
      </section>

      <div className="gov-panel">
        <div className="bg-primary px-3 py-2">
          <Shimmer className="h-4 w-36 bg-primary-600/40" />
        </div>
        <Shimmer className="h-[360px] w-full bg-primary-50" />
      </div>
    </main>
  );
};

export default ContactLoadingPage;
