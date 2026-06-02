"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
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

function FeatureCard({ feature, i }: { feature: FeatureItem; i: number }) {
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
        overflow: "hidden",
        cursor: "default",
      }}
      whileHover={{
        y: -3,
        borderColor: "var(--color-accent)",
        backgroundColor: "color-mix(in srgb, var(--color-accent) 2%, var(--color-card))",
        boxShadow: "0 12px 30px rgba(123, 97, 255, 0.04)",
        transition: { duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] },
      }}
    >
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
          background: "rgba(16, 185, 129, 0.1)",
          color: "var(--color-emerald)",
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
}

export function ProjectFeatures({ features, sectionLabel = "Logros" }: Props) {
  return (
    <section data-section="features" className="section" style={{ borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-bg)" }}>
      <div className="container">
        <span className="label" style={{ display: "inline-block", marginBottom: "2rem" }}>{sectionLabel}</span>
        <motion.div
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
