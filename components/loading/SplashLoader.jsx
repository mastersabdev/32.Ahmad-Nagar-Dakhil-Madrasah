"use client";

import { useEffect, useState } from "react";

const SplashLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full relative bg-[#f5f5f5]">
        <div
          className="absolute inset-0 z-0 opacity-80"
          style={{
            backgroundImage: "url('/images/common/bg-pattern.png')",
            backgroundRepeat: "repeat",
          }}
        />
        <span className="relative z-10 animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return <>{children}</>;
};

export default SplashLoader;
