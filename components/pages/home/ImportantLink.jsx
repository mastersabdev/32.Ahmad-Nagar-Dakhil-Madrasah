import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

const ImportantLink = ({ data = [], title = "Our Services" }) => {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <section className="gov-panel w-full h-full">
      <h2 className="gov-panel-header-muted">{title}</h2>

      {hasData ? (
        <ul className="divide-y divide-slate-200">
          {data.map((link) => (
            <li key={link.id}>
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-800 hover:bg-primary-50 hover:text-primary-700 transition-colors"
              >
                <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <FaChevronRight className="text-[9px]" />
                </span>
                <span className="truncate font-medium">{link.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-6 px-3 text-center text-sm text-slate-500">
          No important links available.
        </div>
      )}
    </section>
  );
};

export default ImportantLink;
