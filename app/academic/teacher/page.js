import FadeInFromLeft from "@/components/animations/FadeInFromLeft";
import TeacherCard from "@/components/card/TeacherCard";
import Empty from "@/components/common/Empty";
import { getTeachers } from "@/services/home";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "শিক্ষক-শিক্ষিকার তালিকা",
  description:
    "Meet the teachers and faculty of .",
  path: "/academic/teacher",
  keywords: ["শিক্ষক", "teachers", "faculty list", "school staff"],
});

const Teachers = async () => {
  const teachers = await getTeachers();
  return (
    <main className="container py-4">
      <div className="page-header gov-panel">
        <h1 className="gov-panel-header">শিক্ষক-শিক্ষিকার তালিকা</h1>
        <p className="section-subtitle px-3 pb-2">
          আমাদের অভিজ্ঞ শিক্ষকদের সাথে পরিচিত হন
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {teachers && teachers?.length > 0 ? (
          teachers.map((teacher, index) => (
            <FadeInFromLeft key={teacher?.id} delay={index * 0.1}>
              <TeacherCard teacher={teacher} />
            </FadeInFromLeft>
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

export default Teachers;
