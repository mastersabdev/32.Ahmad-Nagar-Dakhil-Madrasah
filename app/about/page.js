import { getAboutUs } from "@/services/about-us";
import Image from "next/image";
import { buildPageMetadata, stripHtml, truncate } from "@/lib/seo";

export async function generateMetadata() {
  const aboutData = await getAboutUs();
  const description =
    truncate(stripHtml(aboutData?.description)) ||
    aboutData?.subtitle ||
    "আমাদের বিদ্যালয় সম্পর্কে বিস্তারিত তথ্য";

  return buildPageMetadata({
    title: aboutData?.title || "প্রতিষ্ঠান পরিচিতি",
    description,
    path: "/about",
    image: aboutData?.image_url,
    keywords: [
      "প্রতিষ্ঠান পরিচিতি",
      "school about",
      aboutData?.location,
      aboutData?.eiin,
    ].filter(Boolean),
  });
}

const AboutPage = async () => {
  const aboutData = await getAboutUs();
  return (
    <section className="container py-4 space-y-3">
      <div className="gov-panel">
        <h1 className="gov-panel-header text-center text-lg sm:text-xl">
          {aboutData?.title || "প্রতিষ্ঠান পরিচিতি"}
        </h1>
        {aboutData?.subtitle && (
          <p className="px-4 py-3 text-center text-slate-700 text-sm border-b border-slate-200">
            {aboutData.subtitle}
          </p>
        )}
      </div>

      <div className="relative h-52 sm:h-[50vh] w-full border border-slate-300 overflow-hidden">
        <Image
          className="object-cover"
          src={aboutData?.image_url || "/images/common/placeholder.svg"}
          alt={aboutData?.title || "প্রতিষ্ঠান পরিচিতি"}
          fill
        />
      </div>

      <section className="gov-panel">
        <h2 className="gov-panel-header">প্রতিষ্ঠানের মূল তথ্য</h2>
        <dl className="p-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            { label: "EIIN", value: aboutData?.eiin },
            { label: "অবস্থান", value: aboutData?.location },
            { label: "Established", value: aboutData?.established_year },
            { label: "MPO স্ট্যাটাস", value: aboutData?.mpo },
          ]
            .filter((i) => i.value)
            .map((item) => (
              <div
                key={item.label}
                className="flex items-start justify-between border border-slate-200 bg-slate-50 px-3 py-2.5"
              >
                <dt className="font-medium text-slate-600 text-sm">{item.label}</dt>
                <dd className="text-slate-900 font-semibold text-sm">{item.value}</dd>
              </div>
            ))}
        </dl>
      </section>

      <div className="gov-panel">
        <h2 className="gov-panel-header">বিস্তারিত</h2>
        <div className="p-3 sm:p-4">
          {aboutData?.description ? (
            <div
              className="text-slate-700 text-sm leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: aboutData.description }}
            />
          ) : (
            <p className="text-center text-slate-500 text-sm">তথ্য পাওয়া যায়নি।</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
