import { getHeader } from "@/services/home";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import ContactMap from "./components/ContactMap";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "যোগাযোগ",
  description:
    " যোগাযোগের ঠিকানা, ফোন, ইমেইল এবং যোগাযোগ ফর্ম।",
  path: "/contact",
  keywords: ["যোগাযোগ", "contact", "address", "phone"],
});

const ContactPage = async () => {
  const headerData = await getHeader();
  return (
    <main className="container py-4">
      <header className="page-header">
        <h1 className="gov-panel-header">যোগাযোগ</h1>
        <p className="section-subtitle px-1">আমাদের সাথে যোগাযোগ করুন</p>
      </header>

      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3"
        aria-label="Contact details and form"
      >
        <ContactInfo data={headerData} />
        <div className="gov-panel">
          <h2 className="gov-panel-header">আমাদের লিখুন</h2>
          <div className="p-3 sm:p-4">
            <ContactForm />
          </div>
        </div>
      </section>

      <ContactMap />
    </main>
  );
};

export default ContactPage;
