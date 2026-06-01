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

export function ProjectTechStack({ techStack }: Props) {
  return (
    <section className="section" style={{ borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-bg)" }}>
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
          {techStack.map((tech) => (
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
                transition: "border-color 0.25s ease, color 0.25s ease, background-color 0.25s ease",
                cursor: "default",
              }}
              whileHover={{
                scale: 1.05,
                borderColor: "var(--color-accent)",
                color: "var(--color-accent)",
                backgroundColor: "rgba(123, 97, 255, 0.04)",
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
