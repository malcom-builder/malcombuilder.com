"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AmbientOrb() {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="hidden md:block"
      style={{
        position: "fixed",
        top: "20%",
        right: "-10%",
        width: "min(600px, 80vw)",
        height: "min(600px, 80vw)",
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 30% 30%, var(--orb-color-1) 0%, transparent 60%), radial-gradient(circle at 70% 70%, var(--orb-color-2) 0%, transparent 60%)",
        filter: "blur(80px)",
        pointerEvents: "none",
        zIndex: 0,
      }}
      animate={{
        x: ["0%", "4%", "-2%", "-6%", "0%"],
        y: ["0%", "-6%", "4%", "-3%", "0%"],
        scale: [1, 1.04, 0.97, 1.02, 1],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    />
  );
}
