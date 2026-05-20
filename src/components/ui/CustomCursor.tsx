"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

    // Dynamic hover detection for all interactive elements
    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll("a, button, [role='button'], input, select, textarea");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    // Listeners are re-attached on mutation (when page changes or animations render new elements)
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          body, a, button, [role="button"], select, input, textarea {
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
          backgroundColor: "rgba(158, 80, 247, 0.12)",
          border: isHovered ? "1px solid rgba(158, 80, 247, 0.3)" : "1px solid rgba(158, 80, 247, 0.15)",
          boxShadow: isHovered 
            ? "0 0 30px rgba(158, 80, 247, 0.4), inset 0 0 15px rgba(158, 80, 247, 0.2)"
            : "0 0 20px rgba(158, 80, 247, 0.2)",
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
          backgroundColor: isHovered ? "var(--color-fg)" : "var(--color-accent)",
          boxShadow: "0 0 10px var(--color-accent)",
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
