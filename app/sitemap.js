import { getSiteUrl, PUBLIC_ROUTES } from "@/lib/seo";

export default function sitemap() {
  const lastModified = new Date();

  return PUBLIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: getSiteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
