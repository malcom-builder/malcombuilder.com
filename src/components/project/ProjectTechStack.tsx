"use client";

import { motion } from "framer-motion";
import { SpotlightHeading } from "@/components/ui/SpotlightHeading";
import { useParams } from "next/navigation";

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
  "Next.js": "var(--color-fg)",
  React: "var(--color-fg)",
  TypeScript: "var(--color-fg)",
  "C#": "var(--color-fg)",
  ".NET": "var(--color-fg)",
  ".NET 10": "var(--color-fg)",
  ".NET 8": "var(--color-fg)",
  Docker: "var(--color-fg)",
  "SQL Server": "var(--color-fg)",
  Azure: "var(--color-fg)",
  Vercel: "var(--color-fg)",
  Tailwind: "var(--color-fg)",
  "Framer Motion": "var(--color-fg)",
  Supabase: "var(--color-fg)",
  GitHub: "var(--color-fg)",
  "EF Core": "var(--color-fg)",
  "Telegram API": "var(--color-fg)",
};

export function ProjectTechStack({ techStack }: Props) {
  const params = useParams();
  const locale = params?.locale as string;

  return (
    <section data-section="stack" className="section" style={{ borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-bg)" }}>
      <div className="container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <span className="label" style={{ display: "inline-block", color: "var(--color-lime)" }}>
              {locale === "en" ? "technologies" : "tecnologías"}
            </span>
          </div>
          <div style={{ marginBottom: "4rem" }}>
            <SpotlightHeading as="h2" className="heading" style={{ color: "var(--color-fg)", textTransform: "lowercase" }}>
              {locale === "en" ? "tech stack" : "stack de tecnologías"}
            </SpotlightHeading>
          </div>
        </motion.div>
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
