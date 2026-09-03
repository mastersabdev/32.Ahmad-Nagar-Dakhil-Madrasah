import Link from "next/link";
import SocialFooter from "./SocialFooter";
import Image from "next/image";
import "@/styles/footer.css";

const Footer = ({ footerData }) => {
  return (
    <footer className="footer-gradient text-center text-white/80 lg:text-left relative">
      <SocialFooter socialLinks={footerData?.social_links} />

      <div className="border-b border-white/15 mx-auto w-full" />

      <div className="container mx-auto">
        <div className="py-6 text-center md:text-left">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
            <div className="footer-glass p-4 flex flex-col items-center md:items-start">
              <Image
                src={footerData?.image_url || "/images/common/placeholder.svg"}
                alt={footerData?.school_name || "School"}
                width={90}
                height={90}
                className="mb-3 rounded-full footer-logo"
              />
              <h6 className="mb-1 text-lg font-bold uppercase footer-title">
                {footerData?.school_name || ""}
              </h6>
              <p className="text-white/75 text-sm">
                {footerData?.description || ""}
              </p>
            </div>

            <div className="footer-glass p-4">
              <h6 className="mb-3 font-bold uppercase footer-title text-sm">
                Useful links
              </h6>
              <div className="flex flex-col gap-1.5 items-center md:items-start">
                {footerData?.useful_links &&
                  footerData.useful_links.map((link, index) => (
                    <Link
                      className="footer-link text-sm hover:underline underline-offset-2"
                      href={link.url}
                      key={index}
                    >
                      {link.name}
                    </Link>
                  ))}
              </div>
            </div>

            <div className="footer-glass p-4">
              <h6 className="mb-3 font-bold uppercase footer-title text-sm">
                Contact
              </h6>
              <div className="space-y-1.5">
                <p className="text-sm font-semibold footer-contact">
                  {footerData?.contact_info?.name || ""}
                </p>
                <p className="text-xs footer-contact">
                  {footerData?.contact_info?.designation ||
                    ""}
                </p>
                <p className="text-xs footer-contact">
                  <a
                    href={`tel:${footerData?.contact_info?.phone}`}
                    className="footer-link hover:underline"
                  >
                    {footerData?.contact_info?.phone || ""}
                  </a>
                </p>
                <p className="text-xs footer-contact">
                  <a
                    href={`mailto:${footerData?.contact_info?.email}`}
                    className="footer-link hover:underline"
                  >
                    {footerData?.contact_info?.email || ""}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright py-3 text-center">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-2 text-sm">
          <span>
            All Rights Reserved © 2026
            {new Date().getFullYear() > 2026 &&
              ` - ${new Date().getFullYear()}`}
            &nbsp;|&nbsp;Copyright:
            <a
              className="font-semibold ml-1 footer-link hover:underline"
              href="https://cgmhs.edu.bd"
              target="_blank"
              rel="noopener noreferrer"
            >
              {footerData?.school_name || ""}
            </a>
          </span>
          <span className="text-xs">
            Developed by:
            <a
              className="footer-link ml-1 hover:underline text-secondary!"
              href="https://mastersab.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Master Sab Ltd
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
