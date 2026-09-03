"use client";

import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa6";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="relative z-50">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 flex items-center justify-center
          size-10 text-white transition-all duration-200 bg-primary border border-primary-800 hover:bg-primary-700
          ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        aria-label="Back to top"
      >
        <FaAngleUp size={20} />
      </button>
    </div>
  );
};

export default BackToTop;
