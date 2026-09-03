import Link from "next/link";

export default function Pagination({ page, hasPrev, hasNext, baseUrl }) {
  const linkClass = (disabled) =>
    `btn inline-flex items-center gap-2 border px-3 py-1.5 text-sm font-medium transition-colors ${
      disabled
        ? "pointer-events-none opacity-40 border-slate-200 bg-white text-slate-400"
        : "border-primary bg-primary text-white hover:bg-primary-700"
    }`;

  return (
    <div className="mt-6 flex items-center justify-center w-fit mx-auto gap-3">
      <Link
        href={`${baseUrl}?page=${Math.max(1, page - 1)}`}
        aria-disabled={!hasPrev}
        className={linkClass(!hasPrev)}
      >
        Prev
      </Link>
      <span className="text-sm font-semibold text-white bg-primary px-3 py-1.5 border border-primary-800">
        Page {page}
      </span>
      <Link
        href={`${baseUrl}?page=${page + 1}`}
        aria-disabled={!hasNext}
        className={linkClass(!hasNext)}
      >
        Next
      </Link>
    </div>
  );
}
