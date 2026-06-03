"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { memo, useRef, useState, useCallback } from "react";
import { socialLinks } from "@/lib/constants";

// ── Isolated spotlight per word ──────────────────────────────────────────────
const SpotlightWord = memo(function SpotlightWord({
  children,
  glowColor,
  textShadow,
  hoverTextShadow,
}: {
  children: string;
  glowColor: string;
  textShadow: string;
  hoverTextShadow: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const glowX = useSpring(rawX, { stiffness: 120, damping: 20 });
  const glowY = useSpring(rawY, { stiffness: 120, damping: 20 });

  const bg = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, ${glowColor} 0%, ${glowColor} 10%, transparent 50%)`
  );

  const handleEnter = useCallback(() => setHovered(true), []);
  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (shouldReduceMotion) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set(((e.clientX - rect.left) / rect.width) * 100);
      rawY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [shouldReduceMotion, rawX, rawY]
  );
  const handleLeave = useCallback(() => {
    rawX.set(50);
    rawY.set(50);
    setHovered(false);
  }, [rawX, rawY]);

  const sharedStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
    fontWeight: 700,
    letterSpacing: "-0.03em",
    lineHeight: 1.2,
    whiteSpace: "nowrap",
  };

  return (
    <span
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ position: "relative", display: "inline-block" }}
    >
      {/* Base text — textShadow transitions to glowColor on hover */}
      <span
        style={{
          ...sharedStyle,
          color: "var(--color-fg)",
          textShadow: hovered ? hoverTextShadow : textShadow,
          transition: "text-shadow 0.35s ease",
          display: "inline-block",
        }}
      >
        {children}
      </span>

      {/* Cursor-following spotlight overlay */}
      {!shouldReduceMotion && (
        <motion.span
          aria-hidden
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            ...sharedStyle,
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            color: "transparent",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            backgroundImage: bg,
            display: "inline-block",
          }}
        >
          {children}
        </motion.span>
      )}
    </span>
  );
});

// ── Footer ────────────────────────────────────────────────────────────────────
export function Footer() {
  const t = useTranslations("footer");
  const socials = [
    { href: socialLinks.instagram, label: "Instagram" },
    { href: socialLinks.linkedin, label: "LinkedIn" },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid transparent",
        borderImage: "linear-gradient(90deg, transparent 0%, var(--color-accent) 50%, transparent 100%) 1",
        background: "var(--color-bg)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>

        {/* Wordmark */}
        <a
          href="/"
          style={{
            textDecoration: "none",
            display: "inline-block",
            lineHeight: 1.2,
            transform: "none",
          }}
        >
          <SpotlightWord
            glowColor="rgb(123,97,255)"
            textShadow="0 0 40px rgba(158,80,247,0.35), 0 0 80px rgba(158,80,247,0.15)"
            hoverTextShadow="0 0 20px rgba(123,97,255,0.9), 0 0 60px rgba(123,97,255,0.6), 0 0 120px rgba(123,97,255,0.3), 0 0 200px rgba(123,97,255,0.15)"
          >
            malcom
          </SpotlightWord>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              color: "var(--color-fg)",
            }}
          >
            .
          </span>
          <SpotlightWord
            glowColor="rgb(16,185,129)"
            textShadow="0 0 40px rgba(158,80,247,0.35), 0 0 80px rgba(158,80,247,0.15)"
            hoverTextShadow="0 0 20px rgba(16,185,129,0.9), 0 0 60px rgba(16,185,129,0.6), 0 0 120px rgba(16,185,129,0.3), 0 0 200px rgba(16,185,129,0.15)"
          >
            builder
          </SpotlightWord>
        </a>

        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "0.8rem",
            color: "var(--color-muted)",
            opacity: 0.5,
            letterSpacing: "0.04em",
            fontWeight: 400,
          }}
        >
          {t("tagline")}
        </p>

        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >
          {socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              style={{
                fontSize: "0.8rem",
                fontWeight: 500,
                textTransform: "lowercase",
                letterSpacing: "0.03em",
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
