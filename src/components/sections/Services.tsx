"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightHeading } from "@/components/ui/SpotlightHeading";
import { Building2, Cpu, Layers, Zap } from "lucide-react";
import { memo, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const icons = {
  Building2: <Building2 size={28} />,
  Cpu: <Cpu size={28} />,
  Layers: <Layers size={28} />,
  Zap: <Zap size={28} />,
};

const BentoCard = memo(function BentoCard({ svc, index, t }: { svc: { id: string; icon: string }; index: number; t: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLarge = index === 0 || index === 3;

  // Raw mouse position (0–100%)
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(0);

  // Spring-smoothed values
  const glowX = useSpring(rawX, { stiffness: 150, damping: 20 });
  const glowY = useSpring(rawY, { stiffness: 150, damping: 20 });

  // Build the gradient string reactively via useTransform
  const background = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(var(--spotlight-color), 0.14), transparent 65%)`
  );

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    rawX.set(x);
    rawY.set(y);
    glowX.jump(x);
    glowY.jump(y);
  }, [rawX, rawY, glowX, glowY]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width) * 100);
    rawY.set(((e.clientY - rect.top) / rect.height) * 100);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      initial="idle"
      whileHover="hovered"
      animate="idle"
      style={{
        position: "relative",
        borderRadius: "1rem",
        background: "var(--color-card)",
        border: "1px solid var(--color-border)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gridColumn: isLarge ? "span 2" : "span 1",
        gridRow: isLarge ? "span 2" : "span 1",
        cursor: "default",
      }}
      className={`p-6 md:p-10 ${isLarge ? "md:col-span-2" : "md:col-span-1"}`}
    >
      {/* Cursor-tracking glow — updates every frame via useTransform */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background,
          zIndex: 0,
        }}
        variants={{ idle: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.3 }}
      />

      {/* Border accent on hover */}
      <motion.div
        variants={{ idle: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "1rem",
          border: "1px solid var(--card-glow-border)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.span
          variants={{
            idle: {
              scale: 1,
              boxShadow: "0 0 0px rgba(255, 255, 255, 0)",
              borderColor: "var(--card-icon-border)",
              backgroundColor: "var(--card-icon-bg)",
            },
            hovered: {
              scale: 1.08,
              boxShadow: "0 0 25px rgba(255, 255, 255, 0.2), 0 0 50px rgba(255, 255, 255, 0.08)",
              borderColor: "rgba(255, 255, 255, 0.35)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            color: "var(--color-accent)",
            display: "inline-block",
            marginBottom: "2rem",
            padding: "1rem",
            borderRadius: "12px",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          {icons[svc.icon as keyof typeof icons]}
        </motion.span>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isLarge ? "clamp(1.4rem, 4vw, 1.75rem)" : "clamp(1.15rem, 3vw, 1.25rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--color-fg)",
            marginBottom: "1rem",
            textTransform: "lowercase",
          }}
        >
          {t(`items.${index}.title` as any)}
        </h3>
        <p style={{ color: "var(--color-muted)", fontSize: "1rem", lineHeight: 1.6, maxWidth: isLarge ? "80%" : "100%" }}>
          {t(`items.${index}.desc` as any)}
        </p>
      </div>
    </motion.div>
  );
});

export function Services() {
  const t = useTranslations("services");

  const items = [
    { id: "company-building", icon: "Building2" },
    { id: "ai-integration",   icon: "Cpu"       },
    { id: "tech-strategy",    icon: "Layers"    },
    { id: "mvp-dev",          icon: "Zap"       },
  ] as const;

  return (
    <section id="services" className="section" style={{ borderBottom: "1px solid var(--color-border)" }}>
      <div className="container">
        <FadeIn>
          <div style={{ marginBottom: "1rem" }}>
            <span className="label" style={{ display: "inline-block", color: "var(--color-lime)" }}>
              {t("badge")}
            </span>
          </div>
          <div style={{ marginBottom: "4rem" }}>
            <SpotlightHeading as="h2" className="heading" style={{ color: "var(--color-fg)", textTransform: "lowercase" }}>
              {t("title")}
            </SpotlightHeading>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gap: "1rem" }} className="grid-cols-1 md:grid-cols-3">
          {items.map((svc, i) => (
            <FadeIn key={svc.id} delay={i * 0.1} rotate={i % 2 === 0 ? 1.5 : -1.5} className={i === 0 || i === 3 ? "md:col-span-2" : "md:col-span-1"}>
              <BentoCard svc={svc} index={i} t={t} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
