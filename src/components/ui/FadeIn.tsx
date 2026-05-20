"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

export function FadeIn({ children, delay = 0, className = "", direction = "up" }: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = { up: { y: 20, x: 0 }, left: { y: 0, x: -20 }, right: { y: 0, x: 20 }, none: { y: 0, x: 0 } };
  const { x, y } = offset[direction];

  return (
    <motion.div
      initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : x, y: shouldReduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
