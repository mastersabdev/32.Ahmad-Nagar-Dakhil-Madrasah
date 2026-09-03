import { IoIosCall, IoMdMail } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import "@/styles/header.css";

const HeaderTopSection = ({ data }) => {
  return (
    <div className="header-gradient border-b border-primary-800">
      <div className="container py-3 flex flex-col md:flex-row items-center gap-3 md:gap-5">
        <Image
          className="rounded-full header-logo max-w-[70px] md:max-w-[95px]"
          src={data?.image_url || "/images/common/placeholder.svg"}
          alt={data?.school_name ? `${data.school_name} logo` : "logo"}
          width={100}
          height={100}
          quality={100}
          priority
        />

        <div className="flex-1 text-center md:text-left">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold header-title leading-tight">
            {data?.school_name || "Name"}
          </p>
          <p className="font-medium text-white/90 text-sm md:text-base mt-1">
            {data?.address || "Address"}
          </p>
          <p className="font-medium text-white/75 text-xs md:text-sm mt-0.5">
            EIIN: {data?.school_code || "Code"}
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-1 text-center md:text-right">
          {data?.phone_no && (
            <p className="flex items-center gap-2 text-sm md:text-base font-medium header-contact justify-center md:justify-end">
              <IoIosCall className="text-lg" />
              <Link className="header-link hover:underline" href={`tel:${data?.phone_no}`}>
                {data?.phone_no}
              </Link>
            </p>
          )}
          {data?.email && (
            <p className="flex items-center gap-2 text-sm md:text-base font-medium header-contact justify-center md:justify-end">
              <IoMdMail />
              <Link className="header-link hover:underline" href={`mailto:${data?.email}`}>
                {data?.email}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTopSection;
