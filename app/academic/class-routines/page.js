import ClassRoutineCard from "@/components/card/ClassRoutineCard";
import Empty from "@/components/common/Empty";
import { classRoutines } from "@/services/academic";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ক্লাস রুটিন",
  description:
    "Download and view class routines for .",
  path: "/academic/class-routines",
  keywords: ["ক্লাস রুটিন", "class routine", "school schedule"],
});

const ClassRoutinePage = async () => {
  const classRoutineData = await classRoutines();

  return (
    <main className="container py-4">
      <div className="page-header gov-panel">
        <h1 className="gov-panel-header">ক্লাস রুটিন</h1>
        <p className="section-subtitle px-3 pb-2">
          আমাদের বিদ্যালয়ের ক্লাস রুটিন সম্পর্কে বিস্তারিত তথ্য
        </p>
      </div>

      <div className="mt-8">
        {classRoutineData && classRoutineData?.length > 0 ? (
          <ClassRoutineCard data={classRoutineData} />
        ) : (
          <Empty
            title="ক্লাস রুটিন পাওয়া যায়নি"
            description={"ক্লাস রুটিনের তথ্য উপলব্ধ নেই।"}
          />
        )}
      </div>
    </main>
  );
};

export default ClassRoutinePage;
