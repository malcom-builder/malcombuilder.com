"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
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
    <motion.div
      variants={cardVariants}
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
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <span
            style={{ fontSize: "0.875rem", fontFamily: "monospace", fontWeight: 700, color: "var(--color-muted)" }}
          >
            {proj.id}
          </span>
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

        {/* Internal link — click on title goes to project page */}
        <Link
          href={`/projects/${proj.slug}`}
          style={{ textDecoration: "none" }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.25rem",
              letterSpacing: "-0.02em",
              color: "var(--color-fg)",
              marginBottom: "0.5rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-fg)")}
          >
            {proj.title}
          </h3>
        </Link>
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
        {/* Internal link — view project details */}
        <Link
          href={`/projects/${proj.slug}`}
          style={{
            fontSize: "0.85rem",
            color: "var(--color-muted)",
            fontWeight: 500,
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
        >
          {proj.metric}
        </Link>

        {/* External link */}
        <a
          href={proj.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.85rem",
            color: "var(--color-muted)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-muted)";
          }}
        >
          <ArrowUpRight size={16} />
        </a>
      </div>
    </motion.div>
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
