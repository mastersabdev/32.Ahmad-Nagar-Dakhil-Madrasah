import SectionResultClient from "./components/SectionResultClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "শাখা ভিত্তিক ফলাফল",
  description:
    "View section-wise exam results by class, group, and exam for .",
  path: "/results/section",
  keywords: ["শাখা ফলাফল", "section result", "exam results", "class result"],
});

export default function SectionResultPage() {
  return <SectionResultClient />;
}
