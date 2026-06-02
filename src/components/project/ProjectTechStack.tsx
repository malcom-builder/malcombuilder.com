"use client";

import { motion } from "framer-motion";

interface Props {
  techStack: string[];
}

const listContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const tagItem = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const techColors: Record<string, string> = {
  "Next.js": "#ffffff",
  React: "#61DAFB",
  TypeScript: "#3178C6",
  "C#": "#68217A",
  ".NET": "#512BD4",
  ".NET 10": "#512BD4",
  ".NET 8": "#512BD4",
  Docker: "#2496ED",
  "SQL Server": "#CC292B",
  Azure: "#0078D4",
  Vercel: "#ffffff",
  Tailwind: "#06B6D4",
  "Framer Motion": "#FF4154",
  Supabase: "#3ECF8E",
  GitHub: "#ffffff",
  "EF Core": "#FF6A00",
  "Telegram API": "#26A5E4",
};

export function ProjectTechStack({ techStack }: Props) {
  return (
    <section data-section="stack" className="section" style={{ borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-bg)" }}>
      <div className="container">
        <span className="label" style={{ display: "inline-block", marginBottom: "2rem" }}>Stack</span>
        <motion.div
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.625rem",
          }}
        >
          {techStack.map((tech) => {
            const brandColor = techColors[tech] || "var(--color-accent)";
            return (
              <motion.span
                key={tech}
                variants={tagItem}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.5rem 1.25rem",
                  border: "1px solid var(--color-border)",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--color-fg)",
                  background: "var(--color-card)",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                whileHover={{
                  scale: 1.06,
                  borderColor: brandColor,
                  color: brandColor,
                  backgroundColor: `color-mix(in srgb, ${brandColor} 8%, var(--color-card))`,
                  boxShadow: `0 0 20px color-mix(in srgb, ${brandColor} 15%, transparent)`,
                  transition: { duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] },
                }}
              >
                {/* Brand color dot */}
                <span
                  style={{
                    display: "inline-block",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: brandColor,
                    marginRight: "0.5rem",
                    opacity: 0.6,
                    transition: "opacity 0.25s, transform 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "scale(1.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.6";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                {tech}
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
