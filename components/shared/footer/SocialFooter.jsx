import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa6";

const SocialFooter = ({ socialLinks }) => {
  return (
    <div className="flex container items-center justify-center lg:justify-between py-4">
      <div className="me-12 hidden lg:block">
        <span>Get connected with us on social networks:</span>
      </div>
      {/* Social network icons container */}
      <div className="flex justify-center">
        {socialLinks?.fb_url && (
          <Link
            href={socialLinks.fb_url}
            target="_blank"
            rel="noopener noreferrer"
            className="me-4 text-white hover:text-secondary duration-300 hover:scale-125"
          >
            <FaFacebookF />
          </Link>
        )}

        {socialLinks?.linkedin_url && (
          <Link
            href={socialLinks.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="me-4 text-white hover:text-secondary duration-300 hover:scale-125"
          >
            <FaLinkedinIn />
          </Link>
        )}

        {socialLinks?.youtube_url && (
          <Link
            href={socialLinks.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="me-4 text-white hover:text-secondary duration-300 hover:scale-125"
          >
            <FaYoutube />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SocialFooter;
