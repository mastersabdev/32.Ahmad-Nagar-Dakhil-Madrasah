import AboutUs from "@/components/pages/home/AboutUs";
import ImportantLink from "@/components/pages/home/ImportantLink";
import MainSlider from "@/components/pages/home/MainSlider";
import NoticeBoard from "@/components/pages/home/NoticeBoard";
import OurTeachers from "@/components/pages/home/OurTeachers";
import WelcomeSpeechHeadTeacher from "@/components/pages/home/WelcomeSpeechHeadTeacher";
import { getAboutUs } from "@/services/about-us";
import {
  getHeader,
  getImportantLinks,
  getNotices,
  getSliderImages,
  getWelcomeSpeeches,
} from "@/services/home";
import {
  buildPageMetadata,
  SITE_DESCRIPTION,
  SITE_NAME,
  stripHtml,
  truncate,
} from "@/lib/seo";

export async function generateMetadata() {
  const [headerData, aboutUsData] = await Promise.all([
    getHeader(),
    getAboutUs(),
  ]);

  const schoolName = headerData?.school_name || SITE_NAME || "School";
  const description =
    truncate(stripHtml(aboutUsData?.description)) ||
    headerData?.address ||
    SITE_DESCRIPTION;

  return buildPageMetadata({
    title: schoolName,
    description,
    path: "/",
    image: headerData?.image_url,
    schoolName,
    keywords: [
      schoolName,
      "school notices",
      "exam results",
      "academic information",
    ].filter(Boolean),
  });
}

const hasWelcomeSpeech = (data) =>
  Boolean(data && (data.name || data.speech || data.image_url));

const HomePage = async () => {
  const [
    headerData,
    sliderImages,
    notices,
    importantLinksData,
    aboutUsData,
    welcomeSpeeches,
  ] = await Promise.all([
    getHeader(),
    getSliderImages(),
    getNotices(),
    getImportantLinks(),
    getAboutUs(),
    getWelcomeSpeeches(),
  ]);
  const orderedSpeeches = [...(welcomeSpeeches || [])]
    .filter(hasWelcomeSpeech)
    .sort((a, b) => (a.serial ?? 0) - (b.serial ?? 0));
  const schoolName = headerData?.school_name || SITE_NAME;

  return (
    <div className="container py-3">
      <h1 className="sr-only">{schoolName}</h1>

      <MainSlider sliderImages={sliderImages} />

      {/* Board-style 3-column: Services | Notice | Officials */}
      <div className="mt-3 grid grid-cols-1 lg:grid-cols-[220px_1fr_200px] gap-3 items-start">
        <ImportantLink data={importantLinksData} title="Our Services" />

        <div className="space-y-3 min-w-0">
          <div className="gov-panel p-3">
            <h2 className="text-base md:text-lg font-bold text-slate-900">
              Welcome to {schoolName}
            </h2>
          </div>
          <NoticeBoard notices={notices} />
        </div>

        {orderedSpeeches.length > 0 && (
          <aside className="space-y-3">
            {orderedSpeeches.map((speech) => (
              <WelcomeSpeechHeadTeacher
                key={speech.id ?? speech.serial}
                data={speech}
                compact
              />
            ))}
          </aside>
        )}
      </div>

      <AboutUs data={aboutUsData} />

      <OurTeachers />
    </div>
  );
};

export default HomePage;
