import ManagingCommitteeCard from "@/components/card/ManagingCommitteeCard";
import Empty from "@/components/common/Empty";
import { getManagingCommittees } from "@/services/academic";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ব্যবস্থাপনা কমিটি",
  description:
    "Managing committee members of .",
  path: "/academic/committee",
  keywords: ["ব্যবস্থাপনা কমিটি", "managing committee", "school committee"],
});

const CommitteePage = async () => {
  const committees = await getManagingCommittees();
  return (
    <main className="container py-4">
      <div className="page-header gov-panel">
        <h1 className="gov-panel-header">ব্যবস্থাপনা কমিটি</h1>
        <p className="section-subtitle px-3 pb-2">কমিটির সদস্যদের সাথে পরিচিত হন</p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {committees && committees?.length > 0 ? (
          committees.map((committee) => (
            <ManagingCommitteeCard key={committee?.id} committee={committee} />
          ))
        ) : (
          <Empty
            className={"col-span-full"}
            title="No data yet!"
            description="Please check back later for updates."
          />
        )}
      </div>
    </main>
  );
};

export default CommitteePage;
