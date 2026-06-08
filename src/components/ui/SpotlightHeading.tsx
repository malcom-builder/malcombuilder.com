"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ReactNode, useRef, useCallback, CSSProperties, useState, useEffect } from "react";
import { useTheme } from "next-themes";

const RGB_REGEX = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;

interface Props {
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div";
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  glowColor?: string;
}

function parseRgb(color: string): [number, number, number] {
  const m = color.match(RGB_REGEX);
  return m ? [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])] : [255, 255, 255];
}

export function SpotlightHeading({ as: Tag = "h2", children, className = "", style = {}, glowColor = "rgb(255,255,255)" }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const activeGlowColor = mounted && resolvedTheme === "light" && glowColor === "rgb(255,255,255)"
    ? "rgb(9,9,11)"
    : glowColor;

  const [r, g, b] = parseRgb(activeGlowColor);
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);

  const glowX = useSpring(rawX, { stiffness: 120, damping: 20 });
  const glowY = useSpring(rawY, { stiffness: 120, damping: 20 });

  const background = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, ${activeGlowColor} 0%, ${activeGlowColor} 10%, transparent 50%)`
  );

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    setHovered(true);
    if (shouldReduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    rawX.set(x);
    rawY.set(y);
    glowX.jump(x);
    glowY.jump(y);
  }, [shouldReduce, rawX, rawY, glowX, glowY]);

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
    setHovered(false);
  }, []);

  if (shouldReduce) {
    return <Tag className={className} style={style}>{children}</Tag>;
  }

  // Extract layout props for the container; the rest goes to the tag
  const { margin, marginTop, marginBottom, marginLeft, marginRight, zIndex, position, ...tagStyle } = style;

  const containerStyle: CSSProperties = {
    position: position || "relative",
    display: "table",
    zIndex,
    ...(margin !== undefined ? { margin } : {}),
    ...(marginTop !== undefined ? { marginTop } : {}),
    ...(marginBottom !== undefined ? { marginBottom } : {}),
    ...(marginLeft !== undefined ? { marginLeft } : {}),
    ...(marginRight !== undefined ? { marginRight } : {}),
  };

  const overlayStyle = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    color: "transparent",
    textShadow: "none",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    filter: `drop-shadow(0 0 12px rgba(${r},${g},${b},0.5)) drop-shadow(0 0 30px rgba(${r},${g},${b},0.25))`,
  } satisfies CSSProperties;

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={containerStyle}
    >
      <Tag
        className={className}
        style={{
          ...tagStyle,
          textShadow: `0 0 40px rgba(${r}, ${g}, ${b}, 0.35), 0 0 80px rgba(${r}, ${g}, ${b}, 0.15)`,
        }}
      >
        {children}
      </Tag>
      <motion.span
        aria-hidden
        className={className}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ ...tagStyle, ...overlayStyle, backgroundImage: background } as any}
      >
        {children}
      </motion.span>
    </div>
  );
}
