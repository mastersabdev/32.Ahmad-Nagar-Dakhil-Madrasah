import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa6";

const RenderChildren = ({ items, pathname, level = 1 }) => {
  return (
    <div
      className={cn(
        "bg-primary-700 shadow-md border border-primary-800 flex flex-col",
        level > 1 ? "pl-0" : ""
      )}
    >
      {items.map((child) => {
        const isActive = pathname === child.path;
        const hasSub = child.children && child.children.length > 0;

        return (
          <div key={child.label} className="relative group border-b border-white/10 last:border-b-0">
            <Link
              href={child.path}
              target={child.openInNewTab ? "_blank" : "_self"}
              rel={child.openInNewTab ? "noopener noreferrer" : undefined}
              className={cn(
                "header-link flex gap-2 items-center px-3 py-2.5 text-sm font-medium w-full whitespace-nowrap hover:bg-black/20",
                isActive ? "bg-black/25 text-secondary!" : ""
              )}
            >
              {child.label} {hasSub && <FaAngleDown className="text-xs" />}
            </Link>

            {hasSub && (
              <div className="absolute top-0 left-full ml-0 hidden group-hover:flex z-50">
                <RenderChildren
                  items={child.children}
                  pathname={pathname}
                  level={level + 1}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RenderChildren;
