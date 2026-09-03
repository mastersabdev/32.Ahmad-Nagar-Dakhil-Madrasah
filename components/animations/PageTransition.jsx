"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

const PageTransition = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "tween",
          stiffness: 260,
          damping: 20,
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
