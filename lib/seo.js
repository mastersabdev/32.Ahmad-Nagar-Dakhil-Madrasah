export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://cgmhs.edu.bd"
).replace(/\/$/, "");

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "School";

export const SITE_DESCRIPTION =
  "Official school website. Academic information, exam results, notices, teachers, gallery, and contact details.";

export const DEFAULT_KEYWORDS = [
  "school",
  "government school Bangladesh",
  "school exam results",
  "academic information",
  "school notices",
  "teachers",
  "school gallery",
];

export function getSiteUrl(path = "/") {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function stripHtml(html = "") {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncate(text = "", maxLength = 160) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}…`;
}

export function buildPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image,
  keywords = DEFAULT_KEYWORDS,
  noIndex = false,
  schoolName = SITE_NAME,
}) {
  const resolvedSiteName = schoolName || SITE_NAME || "School";
  const canonical = getSiteUrl(path);
  const shortTitle =
    !title || title === resolvedSiteName ? resolvedSiteName : title;
  const fullTitle =
    shortTitle === resolvedSiteName
      ? resolvedSiteName
      : `${shortTitle} | ${resolvedSiteName}`;

  const metadata = {
    title:
      shortTitle === resolvedSiteName
        ? { absolute: resolvedSiteName }
        : shortTitle,
    description: truncate(description),
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "bn_BD",
      url: canonical,
      siteName: resolvedSiteName,
      title: fullTitle,
      description: truncate(description),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: fullTitle,
      description: truncate(description),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true },
        },
  };

  if (image) {
    metadata.openGraph.images = [
      { url: image, width: 1200, height: 630, alt: fullTitle },
    ];
    metadata.twitter.images = [image];
  }

  return metadata;
}

export function buildSchoolJsonLd(headerData = {}) {
  const schoolName = headerData?.school_name || SITE_NAME;

  return {
    "@context": "https://schema.org",
    "@type": "School",
    "@id": `${SITE_URL}/#school`,
    name: schoolName,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    ...(headerData?.image_url && { logo: headerData.image_url, image: headerData.image_url }),
    ...(headerData?.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: headerData.address,
        addressCountry: "BD",
      },
    }),
    ...(headerData?.phone_no && { telephone: headerData.phone_no }),
    ...(headerData?.email && { email: headerData.email }),
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "bn-BD",
    publisher: {
      "@id": `${SITE_URL}/#school`,
    },
  };
}

export const PUBLIC_ROUTES = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.8 },
  { path: "/online-services", changeFrequency: "monthly", priority: 0.7 },
  { path: "/academic/students-list", changeFrequency: "weekly", priority: 0.7 },
  { path: "/academic/class-routines", changeFrequency: "weekly", priority: 0.7 },
  { path: "/academic/teacher", changeFrequency: "monthly", priority: 0.7 },
  { path: "/academic/committee", changeFrequency: "monthly", priority: 0.7 },
  { path: "/results/single", changeFrequency: "monthly", priority: 0.6 },
  { path: "/results/section", changeFrequency: "monthly", priority: 0.6 },
];
