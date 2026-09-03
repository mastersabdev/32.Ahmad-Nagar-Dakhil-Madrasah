import { parsePagination } from "@/utils/paginationParser";
import { getGalleries } from "@/services/gallery";
import Pagination from "@/components/ui/Pagination";
import GalleryCard from "@/components/card/GalleryCard";
import Empty from "@/components/common/Empty";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "গ্যালারি",
  description:
    " photo gallery — school events, activities, and campus moments.",
  path: "/gallery",
  keywords: ["গ্যালারি", "school gallery", "school photos", "campus events"],
});

export default async function GalleryPage({ searchParams }) {
  const params = await searchParams;
  const page = params.page;
  const limit = 12;
  const data = await getGalleries(page, limit);
  const items = data.item ?? [];
  const pagination = parsePagination(data.meta ?? {});

  return (
    <section className="container py-4">
      <header className="page-header gov-panel">
        <h1 className="gov-panel-header">গ্যালারি</h1>
        <p className="section-subtitle px-3 pb-2">
          Moments from school life and events.
        </p>
      </header>

      {items.length === 0 ? (
        <Empty
          title="No galleries yet"
          description="Please check back later for updates."
        />
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {items.map((g) => (
              <GalleryCard key={g.id} gallery={g} />
            ))}
          </ul>

          {/* Use the Pagination component */}
          {items.length >= limit && (
            <Pagination
              page={pagination.page}
              hasPrev={pagination.hasPrev}
              hasNext={pagination.hasNext}
              baseUrl="/gallery"
            />
          )}
        </>
      )}
    </section>
  );
}
