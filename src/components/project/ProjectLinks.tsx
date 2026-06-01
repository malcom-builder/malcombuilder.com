"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code } from "lucide-react";

interface Props {
  url: string;
  github?: string;
}

const listContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const linkItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function ProjectLinks({ url, github }: Props) {
  return (
    <section className="section" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="container">
        <motion.div
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <motion.div variants={linkItem}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Visitar sitio <ArrowUpRight size={16} />
            </a>
          </motion.div>
          {github && (
            <motion.div variants={linkItem}>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Code size={16} /> Ver código
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
