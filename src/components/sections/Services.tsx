"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";
import { Building2, Cpu, Layers, Zap } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const icons = { Building2: <Building2 size={28} />, Cpu: <Cpu size={28} />, Layers: <Layers size={28} />, Zap: <Zap size={28} /> };

function BentoCard({ svc, index, t }: { svc: any, index: number, t: any }) {
  const [isHovered, setIsHovered] = useState(false);

  // Asymmetrical spanning for bento effect
  const isLarge = index === 0 || index === 3;

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        position: "relative",
        borderRadius: "1rem",
        background: "var(--color-card)",
        border: "1px solid var(--color-border)",
        overflow: "hidden",
        padding: "2.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gridColumn: isLarge ? "span 2" : "span 1",
        gridRow: isLarge ? "span 2" : "span 1",
      }}
      className={isLarge ? "md:col-span-2" : "md:col-span-1"}
    >
      {/* Glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      
      <div style={{ position: "relative", zIndex: 1 }}>
        <span style={{ color: "var(--color-accent)", display: "inline-block", marginBottom: "2rem", padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
          {icons[svc.icon as keyof typeof icons]}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isLarge ? "1.75rem" : "1.25rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--color-fg)",
            marginBottom: "1rem",
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
}

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
          <span className="label" style={{ display: "inline-block", marginBottom: "1rem", color: "var(--color-accent)" }}>{t("badge")}</span>
          <h2 className="heading" style={{ color: "var(--color-fg)", marginBottom: "4rem" }}>{t("title")}</h2>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gap: "1rem",
          }}
          className="grid-cols-1 md:grid-cols-3"
        >
          {items.map((svc, i) => (
            <FadeIn key={svc.id} delay={i * 0.1} className={i === 0 || i === 3 ? "md:col-span-2" : "md:col-span-1"}>
              <BentoCard svc={svc} index={i} t={t} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
