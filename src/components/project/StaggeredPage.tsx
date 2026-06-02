"use client";

import { motion } from "framer-motion";
import { Children } from "react";
import { useReducedMotion } from "framer-motion";

export function StaggeredPage({ children }: { children: React.ReactNode }) {
  const shouldReduce = useReducedMotion();
  const items = Children.toArray(children);

  if (shouldReduce) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
      }}
      style={{ display: "contents" }}
    >
      {items.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
            },
          }}
          style={{ display: "contents" }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
