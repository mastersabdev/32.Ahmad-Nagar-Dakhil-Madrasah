"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import RenderChildren from "./RenderChildren";
import { FaAngleDown } from "react-icons/fa6";

const NavLink = ({ item, onClick }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isParentActive =
    pathname === item.path ||
    item.children?.some(
      (c) =>
        pathname.startsWith(c.path) ||
        c.children?.some((s) => pathname.startsWith(s.path))
    );

  const handleClick = (e) => {
    if (item.children) {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else {
      onClick?.();
    }
  };

  return (
    <div
      className="relative z-10 lg:flex-1"
      onMouseEnter={() => !isMobile() && setIsOpen(true)}
      onMouseLeave={() => !isMobile() && setIsOpen(false)}
    >
      <Link
        href={item.path}
        onClick={handleClick}
        target={item.openInNewTab ? "_blank" : "_self"}
        rel={item.openInNewTab ? "noopener noreferrer" : undefined}
        className={cn(
          "header-link flex gap-1.5 items-center justify-center px-2.5 py-2.5 text-[13px] font-semibold whitespace-nowrap border-r border-white/10 last:border-r-0",
          isParentActive ? "bg-black/20 text-secondary!" : ""
        )}
      >
        {item.label}
        {item.children && (
          <FaAngleDown
            className={cn(
              "text-[10px] transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        )}
      </Link>

      {item.children && (
        <div
          className={cn(
            "transition-all duration-200 lg:absolute lg:top-full lg:left-0 mt-0 min-w-[200px] z-40",
            isOpen
              ? "opacity-100 translate-y-0 max-h-[500px]"
              : "opacity-0 -translate-y-1 max-h-0 overflow-hidden pointer-events-none"
          )}
        >
          <RenderChildren items={item.children} pathname={pathname} />
        </div>
      )}
    </div>
  );
};

function isMobile() {
  return typeof window !== "undefined" && window.innerWidth < 1024;
}

export default NavLink;
