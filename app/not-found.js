import Link from "next/link";
import { FaRegSadTear } from "react-icons/fa";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "পৃষ্ঠা পাওয়া যায়নি",
  description: "The page you are looking for could not be found.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="gov-panel max-w-md w-full text-center">
        <div className="gov-panel-header">৪০৪</div>
        <div className="p-6 flex flex-col items-center">
          <FaRegSadTear className="text-primary text-4xl mb-3" />
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            পৃষ্ঠা পাওয়া যায়নি
          </h1>
          <p className="text-slate-600 text-sm mb-5">
            দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি।
          </p>
          <Link href="/" className="btn-primary">
            হোমে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
