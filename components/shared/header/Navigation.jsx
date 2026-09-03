"use client";

import { useState } from "react";
import NavLink from "./NavLink";
import { FiMenu, FiX } from "react-icons/fi";
import { navItems } from "./navItems";
import "@/styles/header.css";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="header-nav sticky top-0 z-30 shadow-sm">
      <nav className="container py-0" aria-label="Primary navigation">
        <ul className="flex w-full flex-wrap items-stretch max-lg:hidden">
          {navItems.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </ul>

        <div className="flex justify-between items-center lg:hidden py-2">
          <span className="text-white font-semibold text-sm">মেনু</span>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-2xl p-1 hover:bg-black/10 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        <ul
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden
    ${
      isMenuOpen
        ? "pb-2 flex flex-col gap-1 text-white max-h-[500px] opacity-100"
        : "max-h-0 opacity-0"
    }`}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              onClick={() => setIsMenuOpen(false)}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
