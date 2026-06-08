"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ReactNode, useRef, useCallback, CSSProperties, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Link } from "@/i18n/routing";

const RGB_REGEX = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
  glowColor?: string;
}

function parseRgb(color: string): [number, number, number] {
  const m = color.match(RGB_REGEX);
  return m ? [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])] : [255,255,255];
}

export function SpotlightButton({ href, children, className = "", style = {}, id, glowColor = "rgb(255,255,255)" }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const activeGlowColor = mounted && resolvedTheme === "light" && glowColor === "rgb(255,255,255)"
    ? "rgb(9,9,11)"
    : glowColor;

  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [r, g, b] = parseRgb(activeGlowColor);

  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);

  const glowX = useSpring(rawX, { stiffness: 120, damping: 20 });
  const glowY = useSpring(rawY, { stiffness: 120, damping: 20 });

  const background = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgb(${r},${g},${b}) 0%, rgb(${r},${g},${b}) 5%, transparent 20%)`
  );

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (shouldReduce) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set(((e.clientX - rect.left) / rect.width) * 100);
      rawY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [shouldReduce, rawX, rawY]
  );
  const handleMouseLeave = useCallback(() => {
    rawX.set(50);
    rawY.set(50);
    setHovered(false);
  }, [rawX, rawY]);

  if (shouldReduce) {
    return <Link href={href} id={id} className={className} style={style}>{children}</Link>;
  }

  const { gap, fontSize, fontWeight, fontFamily, letterSpacing, whiteSpace, textAlign } = style;

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        display: "inline-flex",
        borderRadius: "9999px",
      }}
    >
      <Link href={href} id={id} className={className} style={style}>
        <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap }}>
          {children}
          <motion.span
            aria-hidden
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              color: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              backgroundImage: background,
              filter: `drop-shadow(0 0 6px rgba(${r},${g},${b},0.5)) drop-shadow(0 0 12px rgba(${r},${g},${b},0.25))`,
              display: "inline-flex",
              alignItems: "center",
              gap,
              fontSize,
              fontWeight,
              fontFamily,
              letterSpacing,
              whiteSpace: whiteSpace ?? ("nowrap" as const),
              textAlign,
            }}
          >
            {children}
          </motion.span>
        </span>
      </Link>
    </div>
  );
}
