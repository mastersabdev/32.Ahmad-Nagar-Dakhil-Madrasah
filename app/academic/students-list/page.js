import Empty from "@/components/common/Empty";
import { getStudentSummary } from "@/services/academic";
import { parsePagination } from "@/utils/paginationParser";
import StudentListTable from "./components/StudentListTable";
import Pagination from "@/components/ui/Pagination";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "শ্রেণি ও শিক্ষার্থী",
  description:
    "Class-wise student summary and enrollment information for .",
  path: "/academic/students-list",
  keywords: ["শ্রেণি", "শিক্ষার্থী", "student list", "class summary"],
});

export default async function StudentsListPage({ searchParams }) {
  const params = await searchParams;
  const page = params.page;
  const limit = 12;
  const data = await getStudentSummary(page, limit);
  const items = data.item ?? [];
  const pagination = parsePagination(data.meta ?? {});

  return (
    <section className="container py-4">
      <header className="page-header gov-panel">
        <h1 className="gov-panel-header">শ্রেণি ও শিক্ষার্থী</h1>
        <p className="section-subtitle px-3 pb-2">
          আমাদের বিদ্যালয়ের শ্রেণি ও শিক্ষার্থীদের তালিকা।
        </p>
      </header>

      {items.length === 0 ? (
        <Empty
          title="No data available"
          description="Please check back later for updates."
        />
      ) : (
        <>
          <StudentListTable data={items} />

          {/* Use the Pagination component */}
          {items.length >= limit && (
            <Pagination
              page={pagination.page}
              hasPrev={pagination.hasPrev}
              hasNext={pagination.hasNext}
              baseUrl="/academic/students-list"
            />
          )}
        </>
      )}
    </section>
  );
}
