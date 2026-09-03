import {
  PageHeaderSkeleton,
  ProfileCardSkeleton,
} from "@/components/loading/Skeleton";

const TeacherLoading = () => {
  return (
    <main className="container py-4 animate-pulse">
      <PageHeaderSkeleton titleWidth="w-56" descWidth="w-64" />

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <ProfileCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
};

export default TeacherLoading;
