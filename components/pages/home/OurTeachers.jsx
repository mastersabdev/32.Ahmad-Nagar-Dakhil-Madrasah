import TeacherCard from "@/components/card/TeacherCard";
import { getTeachers } from "@/services/home";

const OurTeachers = async () => {
  const teachers = await getTeachers();
  return (
    <section className="mt-3 gov-panel">
      <div className="gov-panel-header flex items-center justify-between gap-2">
        <h2 className="text-base md:text-lg font-bold">Our Teachers</h2>
      </div>
      <div className="p-3">
        <p className="text-sm text-slate-600 mb-3">
          Meet our passionate and experienced educators
        </p>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {teachers && teachers?.length > 0 ? (
            teachers.map((teacher) => (
              <TeacherCard key={teacher?.id} teacher={teacher} />
            ))
          ) : (
            <p className="text-slate-500 col-span-full text-center text-sm py-4">
              No data found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurTeachers;
