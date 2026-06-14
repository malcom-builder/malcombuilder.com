"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SpotlightHeading } from "@/components/ui/SpotlightHeading";
import { useParams } from "next/navigation";
import { useSpotlight, SpotlightGlow } from "./SpotlightGlow";

type FeatureItem = string | { title: string; desc: string };

interface Props {
  features: FeatureItem[];
  sectionLabel?: string;
}

const listContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const FeatureCard = memo(function FeatureCard({ feature, i }: { feature: FeatureItem; i: number }) {
  const spotlight = useSpotlight();
  const isRich = typeof feature === "object";

  return (
    <motion.div
      variants={cardItem}
      ref={spotlight.cardRef}
      onMouseMove={spotlight.handleMouseMove}
      onMouseEnter={() => spotlight.setIsHovered(true)}
      onMouseLeave={spotlight.resetGlow}
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "flex-start",
        padding: "1.5rem",
        border: "1px solid var(--color-border)",
        borderRadius: "10px",
        background: "var(--color-card)",
        position: "relative",
        cursor: "default",
      }}
      whileHover={{
        y: -3,
        transition: { duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] },
      }}
    >
      {/* 1. Glow externo hiper-difuso en deep-purple/10 */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-20px",
          background: "radial-gradient(circle, var(--color-deep-purple) 0%, transparent 70%)",
          filter: "blur(32px)",
          pointerEvents: "none",
          zIndex: -1,
        }}
        animate={{ opacity: spotlight.isHovered ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* 2. Top-border highlight sutil hacia cyber-blue/30 */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: "12px",
          right: "12px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--color-cyber-blue) 50%, transparent)",
          pointerEvents: "none",
          zIndex: 2,
        }}
        animate={{ opacity: spotlight.isHovered ? 0.3 : 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* 3. Border accent on hover */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "10px",
          border: "1px solid var(--card-glow-border)",
          pointerEvents: "none",
          zIndex: 2,
        }}
        animate={{ opacity: spotlight.isHovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      <SpotlightGlow
        spotlightBg={spotlight.spotlightBg}
        isHovered={spotlight.isHovered}
        borderRadius="10px"
      />
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "1.5rem",
          height: "1.5rem",
          borderRadius: "50%",
          background: "rgba(170, 220, 236, 0.08)",
          color: "var(--color-cyber-blue)",
          marginTop: "2px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Check size={14} strokeWidth={3} />
      </motion.span>
      {isRich ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ display: "flex", flexDirection: "column", gap: "0.35rem", position: "relative", zIndex: 1 }}
        >
          <span style={{ color: "var(--color-fg)", fontSize: "0.975rem", fontWeight: 600, lineHeight: 1.4 }}>
            {(feature as { title: string; desc: string }).title}
          </span>
          <span style={{ color: "var(--color-muted)", fontSize: "0.875rem", lineHeight: 1.55 }}>
            {(feature as { title: string; desc: string }).desc}
          </span>
        </motion.div>
      ) : (
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ color: "var(--color-muted)", fontSize: "0.975rem", lineHeight: 1.55, position: "relative", zIndex: 1 }}
        >
          {feature as string}
        </motion.span>
      )}
    </motion.div>
  );
});

export function ProjectFeatures({ features, sectionLabel = "Logros" }: Props) {
  const params = useParams();
  const locale = params?.locale as string;

  return (
    <section data-section="features" className="section" style={{ borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-bg)" }}>
      <div className="container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <span className="label" style={{ display: "inline-block", color: "var(--color-cyber-blue)", fontFamily: "var(--font-mono, monospace)" }}>
              {locale === "en" ? "scope" : "alcance"}
            </span>
          </div>
          <div style={{ marginBottom: "4rem" }}>
            <SpotlightHeading as="h2" className="heading" style={{ color: "var(--color-fg)", textTransform: "lowercase" }}>
              {sectionLabel}
            </SpotlightHeading>
          </div>
        </motion.div>
        <div style={{ position: "relative", marginTop: "2rem" }}>
          {/* Deep Purple Ambient Depth Glow behind features bento grid */}
          <div
            style={{
              position: "absolute",
              inset: "-10%",
              background: "radial-gradient(circle at 50% 50%, var(--color-deep-purple) 0%, transparent 65%)",
              filter: "blur(100px)",
              opacity: 0.1,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <motion.div
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            style={{ position: "relative", zIndex: 1 }}
          >
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} i={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
