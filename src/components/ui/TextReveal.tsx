"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // Split text by lines (if there are \n), then by words
  const lines = text.split("\n");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50, rotateX: -20 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  if (shouldReduceMotion) {
    return <span className={className} style={{ whiteSpace: "pre-line" }}>{text}</span>;
  }

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      className={className}
      style={{ display: "inline-block", perspective: "1000px" }}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} style={{ display: "block", overflow: "hidden", paddingBottom: "0.2em", marginBottom: "-0.2em" }}>
          {line.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em", paddingBottom: "0.2em", marginBottom: "-0.2em" }}>
              <motion.span variants={item} style={{ display: "inline-block", transformOrigin: "bottom" }}>
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
