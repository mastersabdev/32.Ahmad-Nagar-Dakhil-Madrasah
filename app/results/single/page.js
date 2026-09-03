import SingleResultClient from "./components/SingleResultClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "একক ফলাফল",
  description:
    "Search and print individual student exam results for .",
  path: "/results/single",
  keywords: ["একক ফলাফল", "exam result", "marksheet", "student result"],
});

export default function SingleResultPage() {
  const assetBaseUrl = (process.env.CAMPUSMASTER_BASE_URL || "").replace(
    /\/$/,
    "",
  );

  return <SingleResultClient assetBaseUrl={assetBaseUrl} />;
}
