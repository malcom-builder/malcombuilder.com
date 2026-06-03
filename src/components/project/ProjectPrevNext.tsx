"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Project } from "@/lib/constants";
import { useSpotlight, SpotlightGlow } from "./SpotlightGlow";

interface Props {
  prev: Project | null;
  next: Project | null;
  locale: string;
}

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.1 },
  }),
};

const PrevNextCard = memo(function PrevNextCard({
  project,
  direction,
  locale,
  custom,
}: {
  project: Project;
  direction: "prev" | "next";
  locale: string;
  custom: number;
}) {
  const spotlight = useSpotlight();
  const ArrowIcon = direction === "prev" ? ArrowLeft : ArrowRight;
  const label = direction === "prev"
    ? locale === "en" ? "Previous" : "Anterior"
    : locale === "en" ? "Next" : "Siguiente";

  return (
    <motion.div
      variants={linkVariants}
      custom={custom}
      style={{ textAlign: direction === "prev" ? "left" : "right" }}
      ref={spotlight.cardRef}
      onMouseMove={spotlight.handleMouseMove}
      onMouseEnter={() => spotlight.setIsHovered(true)}
      onMouseLeave={spotlight.resetGlow}
    >
      <Link
        href={`/projects/${project.slug}`}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          padding: "1.5rem",
          border: "1px solid var(--color-border)",
          borderRadius: "10px",
          textDecoration: "none",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.25s ease, background-color 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--color-accent)";
          e.currentTarget.style.backgroundColor = "rgba(123, 97, 255, 0.02)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <SpotlightGlow
          spotlightBg={spotlight.spotlightBg}
          isHovered={spotlight.isHovered}
          borderRadius="10px"
        />
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--color-muted)",
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            position: "relative",
            zIndex: 1,
            alignSelf: direction === "next" ? "flex-end" : "flex-start",
          }}
        >
          {direction === "prev" && (
            <motion.span
              initial={false}
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ display: "inline-flex" }}
            >
              <ArrowIcon size={14} />
            </motion.span>
          )}
          {label}
          {direction === "next" && (
            <motion.span
              initial={false}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ display: "inline-flex" }}
            >
              <ArrowIcon size={14} />
            </motion.span>
          )}
        </span>
        <span
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--color-fg)",
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.02em",
            transition: "color 0.2s",
            position: "relative",
            zIndex: 1,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-fg)")}
        >
          {project.title}
        </span>
        <span style={{ fontSize: "0.75rem", color: "var(--color-muted)", position: "relative", zIndex: 1 }}>
          {project.category}
        </span>
      </Link>
    </motion.div>
  );
});

export function ProjectPrevNext({ prev, next, locale }: Props) {
  const shouldReduce = useReducedMotion();

  return (
    <section className="section" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="container">
        <motion.div
          initial={shouldReduce ? undefined : "hidden"}
          whileInView={shouldReduce ? undefined : "show"}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          style={{
            display: "grid",
            gridTemplateColumns: prev && next ? "1fr 1fr" : "1fr",
            gap: "1.5rem",
          }}
        >
          {prev && <PrevNextCard project={prev} direction="prev" locale={locale} custom={0} />}
          {next && <PrevNextCard project={next} direction="next" locale={locale} custom={1} />}
        </motion.div>
      </div>
    </section>
  );
}
