import { getOnlineServices } from "@/services/online-services";
import Link from "next/link";
import { FiExternalLink, FiLink } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "অনলাইন সেবা",
  description:
    "Access online services from  — forms, portals, and digital resources.",
  path: "/online-services",
  keywords: ["অনলাইন সেবা", "online services", "school portal"],
});

export default async function OnlineServices() {
  const onlineServices = await getOnlineServices();
  return (
    <section className="container py-4">
      <div className="gov-panel">
        <h1 className="gov-panel-header">অনলাইন সেবা</h1>
        <div className="p-3">
          <p className="text-sm text-slate-600 mb-3">
            Access school services and resources online
          </p>

          {onlineServices && onlineServices?.length > 0 ? (
            <ul className="divide-y divide-slate-200 border border-slate-200">
              {onlineServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 px-3 py-3 hover:bg-primary-50 transition-colors"
                  >
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <FaChevronRight className="text-[9px]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        {service.title}
                        <FiExternalLink className="text-primary text-xs shrink-0" />
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                        {service.service_details}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center border border-slate-200 p-8 text-center">
              <span className="mb-2 inline-flex h-10 w-10 items-center justify-center bg-slate-100 text-slate-500 border border-slate-200">
                <FiLink className="text-lg" />
              </span>
              <h2 className="text-sm font-semibold text-slate-800">
                No online services available
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Please check back later for updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
