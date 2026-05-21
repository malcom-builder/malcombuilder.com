"use client";

import { useTranslations } from "next-intl";
import { projects } from "@/lib/constants";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

function ProjectCard({ proj, index }: { proj: typeof projects[number]; index: number }) {
  return (
    <motion.a
      variants={cardVariants}
      href={proj.url}
      target={proj.url !== "#" ? "_blank" : undefined}
      rel={proj.url !== "#" ? "noopener noreferrer" : undefined}
      id={`project-${proj.id}`}
      whileHover="hovered"
      initial="idle"
      animate="idle"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "2rem",
        background: "var(--color-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "8px",
        minHeight: "220px",
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* hover glow layer */}
      <motion.div
        variants={{
          idle: { opacity: 0 },
          hovered: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 0%, rgba(129, 140, 248, 0.08), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* border accent on hover */}
      <motion.div
        variants={{
          idle: { opacity: 0 },
          hovered: { opacity: 1 },
        }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "8px",
          border: "1px solid var(--color-accent)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          {/* Project number: muted → accent on hover */}
          <motion.span
            variants={{
              idle: { color: "var(--color-muted)" },
              hovered: { color: "var(--color-emerald)" },
            }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: "0.875rem", fontFamily: "monospace", fontWeight: 700 }}
          >
            {proj.id}
          </motion.span>
          <span
            className="label"
            style={{
              color: "var(--color-muted)",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {proj.category}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.25rem",
            letterSpacing: "-0.02em",
            color: "var(--color-fg)",
            marginBottom: "0.5rem",
          }}
        >
          {proj.title}
        </h3>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid var(--color-border)",
          paddingTop: "1rem",
          marginTop: "1rem",
        }}
      >
        <span style={{ fontSize: "0.85rem", color: "var(--color-muted)", fontWeight: 500 }}>
          {proj.metric}
        </span>

        {/* Arrow with spring physics */}
        <motion.span
          variants={{
            idle: { x: 0, y: 0, rotate: 0, color: "var(--color-muted)" },
            hovered: { x: 4, y: -4, rotate: 15, color: "var(--color-accent)" },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          style={{ display: "inline-flex" }}
        >
          <ArrowUpRight size={20} />
        </motion.span>
      </div>
    </motion.a>
  );
}

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="section" style={{ borderBottom: "1px solid var(--color-border)" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="label" style={{ display: "inline-block", marginBottom: "1rem" }}>{t("badge")}</span>
          <h2 className="heading" style={{ color: "var(--color-fg)", marginBottom: "3rem" }}>{t("title")}</h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
          className="md:grid-cols-2"
        >
          {projects.map((proj, i) => (
            <ProjectCard key={proj.id} proj={proj} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
