"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SpotlightButton } from "@/components/ui/SpotlightButton";
import { useCallback, useEffect, useRef, useState } from "react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const item      = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } } };

export function Hero() {
  const t = useTranslations("hero");
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // ── "Solo" white spotlight ──
  const soloRef = useRef<HTMLDivElement>(null);
  const [soloHovered, setSoloHovered] = useState(false);
  const soloRawX = useMotionValue(50);
  const soloRawY = useMotionValue(50);
  const soloGlowX = useSpring(soloRawX, { stiffness: 120, damping: 20 });
  const soloGlowY = useSpring(soloRawY, { stiffness: 120, damping: 20 });
  const soloBg = useTransform(
    [soloGlowX, soloGlowY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgb(255,255,255) 0%, rgb(255,255,255) 10%, transparent 50%)`
  );
  const handleSoloEnter = useCallback(
    (e: React.MouseEvent) => {
      setSoloHovered(true);
      if (shouldReduceMotion) return;
      const rect = soloRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      soloRawX.set(x);
      soloRawY.set(y);
      soloGlowX.jump(x);
      soloGlowY.jump(y);
    },
    [shouldReduceMotion, soloRawX, soloRawY, soloGlowX, soloGlowY]
  );
  const handleSoloMove = useCallback(
    (e: React.MouseEvent) => {
      if (shouldReduceMotion) return;
      const rect = soloRef.current?.getBoundingClientRect();
      if (!rect) return;
      soloRawX.set(((e.clientX - rect.left) / rect.width) * 100);
      soloRawY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [shouldReduceMotion, soloRawX, soloRawY]
  );
  const handleSoloLeave = useCallback(() => {
    setSoloHovered(false);
  }, []);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const orbX = useSpring(rawX, { stiffness: 40, damping: 20 });
  const orbY = useSpring(rawY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      // Map cursor to ±40px offset from center
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      rawX.set((e.clientX - cx) * 0.06);
      rawY.set((e.clientY - cy) * 0.06);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [shouldReduceMotion, rawX, rawY]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        paddingTop: "6rem",
        paddingBottom: "4rem",
        borderBottom: "1px solid var(--color-border)",
        position: "relative",
      }}
    >
      {/* Dynamic Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        {/* Grid */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(var(--color-border) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            opacity: 0.4,
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
          }}
        />

        {/* Breathing + cursor-tracking AI Glow Orb */}
        <motion.div
          className="hero-orb"
          style={{
            x: orbX,
            y: orbY,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.12, scale: 1 }
              : {
                  opacity: [0.07, 0.15, 0.07],
                  scale: [0.96, 1.04, 0.96],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 2, ease: "easeOut" }
              : {
                  opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  scale:   { duration: 8, repeat: Infinity, ease: "easeInOut" },
                }
          }
        />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1, marginTop: "-14vh" }}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ maxWidth: "1000px" }}
        >
          {/* Badge */}
          <motion.div
            variants={item}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.375rem 0.75rem",
              border: "1px solid var(--color-border)",
              borderRadius: "9999px",
              marginBottom: "1.25rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--color-fg)",
              background: "var(--color-card)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 12px rgba(16, 185, 129, 0.6)" }} />
            {t("tagline")}
          </motion.div>

          {/* Headline */}
          <h1 className="display" style={{ color: "var(--color-fg)", marginBottom: "1rem", whiteSpace: "pre-line" }}>
            <TextReveal text={t("headline")} delay={0.2} />
            <br />
            <div
              ref={soloRef}
              onMouseEnter={handleSoloEnter}
              onMouseMove={handleSoloMove}
              onMouseLeave={handleSoloLeave}
              style={{ position: "relative", display: "inline-block" }}
            >
              <motion.span
                variants={item}
                style={{
                  color: "var(--color-accent)",
                  display: "inline-block",
                  transition: "color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease",
                  cursor: "default",
                  textShadow: "0 0 40px rgba(var(--spotlight-color), 0.5), 0 0 80px rgba(var(--spotlight-color), 0.25)",
                }}
                onMouseEnter={(e) => {
                  handleSoloEnter(e);
                  (e.currentTarget as HTMLElement).style.color = "var(--color-accent-hover)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.02) translateX(4px)";
                  (e.currentTarget as HTMLElement).style.textShadow = "0 0 50px rgba(var(--spotlight-color), 0.7), 0 0 100px rgba(var(--spotlight-color), 0.4)";
                }}
                onMouseLeave={(e) => {
                  handleSoloLeave();
                  (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1) translateX(0)";
                  (e.currentTarget as HTMLElement).style.textShadow = "0 0 40px rgba(var(--spotlight-color), 0.5), 0 0 80px rgba(var(--spotlight-color), 0.25)";
                }}
              >
                {t("headline_accent")}
              </motion.span>
              {!shouldReduceMotion && (
                <motion.span
                  aria-hidden
                  animate={{ opacity: soloHovered ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    color: "transparent",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundImage: soloBg,
                    filter: "drop-shadow(0 0 12px rgba(255,255,255,0.5)) drop-shadow(0 0 30px rgba(255,255,255,0.25))",
                  }}
                >
                  {t("headline_accent")}
                </motion.span>
              )}
            </div>
          </h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
              color: "var(--color-muted)",
              maxWidth: "40rem",
              marginBottom: "2.5rem",
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            {t("subheadline")}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <MagneticButton>
                <SpotlightButton
                  href="#projects"
                  id="hero-cta-primary"
                  glowColor="rgb(255,255,255)"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    color: "var(--color-emerald)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  {t("cta_primary")} <ArrowRight size={18} />
                </SpotlightButton>
              </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        variants={item}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          translateX: "-50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.375rem",
          opacity: 0.35,
        }}
        aria-hidden="true"
      >
        <motion.span
          style={{
            display: "block",
            width: "1px",
            height: "1.25rem",
            background: "linear-gradient(to bottom, var(--color-accent), transparent)",
          }}
          animate={{ opacity: [0.6, 0.2, 0.6], scaleY: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          style={{
            display: "block",
            width: "1px",
            height: "0.75rem",
            background: "linear-gradient(to bottom, var(--color-accent), transparent)",
            opacity: 0.3,
          }}
          animate={{ opacity: [0.4, 0.1, 0.4], scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.span
          style={{
            display: "block",
            width: "1px",
            height: "0.375rem",
            background: "linear-gradient(to bottom, var(--color-accent), transparent)",
            opacity: 0.15,
          }}
          animate={{ opacity: [0.2, 0.05, 0.2], scaleY: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
      </motion.div>
    </section>
  );
}
