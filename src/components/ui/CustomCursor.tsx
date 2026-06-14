"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "next-themes";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Position values for the cursor dot and ring
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for the smooth trail effect on the glowing aura ring
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const auraX = useSpring(cursorX, springConfig);
  const auraY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Dynamic hover detection via event delegation — no MutationObserver needed
    const handleHoverStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && typeof target.matches === "function" && target.matches("a, button, [role='button'], input, select, textarea, [class*='cursor-pointer'], [style*='cursor: pointer']")) {
        setIsHovered(true);
      }
    };
    const handleHoverEnd = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && typeof target.matches === "function" && target.matches("a, button, [role='button'], input, select, textarea, [class*='cursor-pointer'], [style*='cursor: pointer']")) {
        setIsHovered(false);
      }
    };

    document.body.addEventListener("mouseover", handleHoverStart);
    document.body.addEventListener("mouseout", handleHoverEnd);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseover", handleHoverStart);
      document.body.removeEventListener("mouseout", handleHoverEnd);
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* 1. Glowing outer aura ring (spring follow) */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: isHovered ? 64 : 40,
          height: isHovered ? 64 : 40,
          borderRadius: "50%",
          backgroundColor: "var(--cursor-aura-bg)",
          border: isHovered ? "var(--cursor-aura-border-hover)" : "var(--cursor-aura-border)",
          boxShadow: isHovered 
            ? "var(--cursor-aura-shadow-hover)"
            : "var(--cursor-aura-shadow)",
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 99999,
          filter: "blur(1px)",
        }}
        animate={{
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* 2. Sharp solid pointer dot (perfectly synchronous follow) */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: isHovered ? 8 : 6,
          height: isHovered ? 8 : 6,
          borderRadius: "50%",
          backgroundColor: isHovered ? "var(--color-cyber-blue)" : "var(--color-lime)",
          boxShadow: mounted && resolvedTheme === "light" 
            ? "none" 
            : isHovered 
              ? "0 0 10px var(--color-cyber-blue)" 
              : "0 0 10px var(--color-lime)",
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 100000,
        }}
      />
    </>
  );
}
