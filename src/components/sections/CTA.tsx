"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Marquee } from "@/components/ui/Marquee";
import { Link } from "@/i18n/routing";

export function CTA() {
  const t = useTranslations("cta");
  const shouldReduceMotion = useReducedMotion();

  // ── Exact mirror of "Solo" spotlight in Hero ──
  const wordRef = useRef<HTMLDivElement>(null);
  const [wordHovered, setWordHovered] = useState(false);
  const wordRawX = useMotionValue(50);
  const wordRawY = useMotionValue(50);
  const wordGlowX = useSpring(wordRawX, { stiffness: 120, damping: 20 });
  const wordGlowY = useSpring(wordRawY, { stiffness: 120, damping: 20 });
  const wordBg = useTransform(
    [wordGlowX, wordGlowY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgb(255,255,255) 0%, rgb(255,255,255) 10%, transparent 50%)`
  );

  const handleWordEnter = useCallback(
    (e: React.MouseEvent) => {
      setWordHovered(true);
      if (shouldReduceMotion) return;
      const rect = wordRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      wordRawX.set(x);
      wordRawY.set(y);
      wordGlowX.jump(x);
      wordGlowY.jump(y);
    },
    [shouldReduceMotion, wordRawX, wordRawY, wordGlowX, wordGlowY]
  );
  const handleWordMove = useCallback(
    (e: React.MouseEvent) => {
      if (shouldReduceMotion) return;
      const rect = wordRef.current?.getBoundingClientRect();
      if (!rect) return;
      wordRawX.set(((e.clientX - rect.left) / rect.width) * 100);
      wordRawY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [shouldReduceMotion, wordRawX, wordRawY]
  );
  const handleWordLeave = useCallback(() => {
    setWordHovered(false);
  }, []);

  return (
    <section id="cta" style={{ overflow: "hidden", position: "relative" }}>
      {/* Marquee */}
      <div
        style={{
          paddingBlock: "5rem",
          borderBottom: "1px solid var(--color-border)",
          borderTop: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg)",
        }}
      >
        <Marquee text={t("marquee")} />
      </div>

      {/* Content */}
      <div className="section" style={{ paddingTop: "16rem", paddingBottom: "12rem", textAlign: "center" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FadeIn>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

              <Link href="/brief" style={{ textDecoration: "none", color: "inherit" }}>
                <div
                  ref={wordRef}
                  onMouseEnter={handleWordEnter}
                  onMouseMove={handleWordMove}
                  onMouseLeave={handleWordLeave}
                  style={{ position: "relative", display: "inline-block" }}
                >
                  {/* Base text — identical pattern to "Solo" but emerald */}
                  <motion.span
                    className="heading"
                    style={{
                      color: "var(--color-emerald)",
                      display: "inline-block",
                      transition: "color 0.3s ease, text-shadow 0.3s ease",
                      cursor: "pointer",
                      textShadow: "0 0 40px rgba(158,80,247,0.35), 0 0 80px rgba(158,80,247,0.15)",
                    }}
                    onMouseEnter={(e) => {
                      handleWordEnter(e);
                      (e.currentTarget as HTMLElement).style.color = "var(--color-emerald-hover)";
                      (e.currentTarget as HTMLElement).style.textShadow =
                        "0 0 40px rgba(158,80,247,0.35), 0 0 80px rgba(158,80,247,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      handleWordLeave();
                      (e.currentTarget as HTMLElement).style.color = "var(--color-emerald)";
                      (e.currentTarget as HTMLElement).style.textShadow =
                        "0 0 40px rgba(158,80,247,0.35), 0 0 80px rgba(158,80,247,0.15)";
                    }}
                  >
                    {t("heading")}
                  </motion.span>

                  {/* White spotlight overlay — identical to "Solo" */}
                  {!shouldReduceMotion && (
                    <motion.span
                      aria-hidden
                      animate={{ opacity: wordHovered ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="heading"
                      style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        color: "transparent",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        backgroundImage: wordBg,
                        filter:
                          "drop-shadow(0 0 8px rgba(255,255,255,0.25)) drop-shadow(0 0 20px rgba(255,255,255,0.1))",
                        display: "inline-block",
                      }}
                    >
                      {t("heading")}
                    </motion.span>
                  )}
                </div>
              </Link>

              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-muted)",
                  opacity: 0.6,
                  margin: 0,
                  letterSpacing: "0.02em",
                  position: "relative",
                  zIndex: 1,
                  marginTop: "1.5rem",
                }}
              >
                {t("sub")}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
