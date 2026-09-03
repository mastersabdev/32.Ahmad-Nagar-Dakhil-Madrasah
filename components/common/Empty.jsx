import { cn } from "@/lib/utils";
import { FiImage } from "react-icons/fi";

const Empty = ({ title, description, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gov-panel p-8 text-center",
        className
      )}
    >
      <span className="mb-3 inline-flex h-11 w-11 items-center justify-center bg-primary-50 text-primary border border-primary-200">
        <FiImage className="text-xl" />
      </span>
      <h2 className="text-base font-semibold text-slate-800">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
};

export default Empty;
