import { Anek_Bangla, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { getFooter, getHeader } from "@/services/home";
import PageTransition from "@/components/animations/PageTransition";
import BackToTop from "@/components/common/BackToTop";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  buildSchoolJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/seo";

const anek_bangla = Anek_Bangla({
  variable: "--font-anek-bangla",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const headerData = await getHeader();
  const schoolLogo = headerData?.image_url;
  const schoolName = headerData?.school_name || SITE_NAME || "School";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: schoolName,
      template: `%s | ${schoolName}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: schoolName,
    authors: [{ name: schoolName, url: SITE_URL }],
    creator: schoolName,
    publisher: schoolName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    ...(schoolLogo && {
      icons: {
        icon: [
          { url: schoolLogo, type: "image/png", sizes: "32x32" },
          { url: schoolLogo, type: "image/png", sizes: "192x192" },
        ],
        shortcut: schoolLogo,
        apple: [{ url: schoolLogo, sizes: "180x180", type: "image/png" }],
      },
    }),
    openGraph: {
      type: "website",
      locale: "bn_BD",
      url: SITE_URL,
      siteName: schoolName,
      title: schoolName,
      description: SITE_DESCRIPTION,
      ...(schoolLogo && {
        images: [
          {
            url: schoolLogo,
            width: 1200,
            height: 630,
            alt: schoolName,
          },
        ],
      }),
    },
    twitter: {
      card: schoolLogo ? "summary_large_image" : "summary",
      title: schoolName,
      description: SITE_DESCRIPTION,
      ...(schoolLogo && {
        images: [schoolLogo],
      }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}

export default async function RootLayout({ children }) {
  const headerData = await getHeader();
  const footerData = await getFooter();
  const schoolJsonLd = buildSchoolJsonLd(headerData);
  const websiteJsonLd = buildWebSiteJsonLd();

  return (
    <html lang="bn">
      <body
        className={`${anek_bangla.variable} ${roboto.variable} antialiased bg-background`}
      >
        <JsonLd data={[schoolJsonLd, websiteJsonLd]} />
        <div
          className="min-h-screen"
          style={{
            backgroundColor: "#f5f5f5",
            backgroundImage: "url('/images/common/bg-pattern.png')",
            backgroundRepeat: "repeat",
            backgroundPosition: "top left",
          }}
        >
          <div className="mx-auto max-w-[1320px] w-[96%] bg-white border-x border-slate-300 shadow-sm min-h-screen flex flex-col">
            <Header headerData={headerData} />
            <main className="w-full relative flex-1">
              <PageTransition>
                <div className="min-h-[calc(100vh-420px)] pb-8 md:pb-12 relative">
                  {children}
                </div>
              </PageTransition>
              <BackToTop />
            </main>
            <Footer footerData={footerData} />
          </div>
        </div>
      </body>
    </html>
  );
}
