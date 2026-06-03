"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

export function useSpotlight() {
  const shouldReduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(0);
  const glowX = useSpring(rawX, { stiffness: 150, damping: 20 });
  const glowY = useSpring(rawY, { stiffness: 150, damping: 20 });
  const spotlightBg = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(123, 97, 255, 0.14), transparent 65%)`
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width) * 100);
    rawY.set(((e.clientY - rect.top) / rect.height) * 100);
  }, [shouldReduce, rawX, rawY]);

  const resetGlow = useCallback(() => {
    rawX.set(50);
    rawY.set(0);
    setIsHovered(false);
  }, [rawX, rawY]);

  return {
    cardRef,
    isHovered,
    setIsHovered,
    spotlightBg,
    handleMouseMove,
    resetGlow,
    shouldReduce,
  };
}

export function SpotlightGlow({
  spotlightBg,
  isHovered,
  borderRadius = "inherit",
}: {
  spotlightBg: ReturnType<typeof useSpotlight>["spotlightBg"];
  isHovered: boolean;
  borderRadius?: string;
}) {
  return (
    <>
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: spotlightBg,
          borderRadius,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          borderRadius,
          border: "1px solid rgba(123, 97, 255, 0.35)",
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}
