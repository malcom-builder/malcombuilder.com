"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SpotlightHeading } from "@/components/ui/SpotlightHeading";
import { useParams } from "next/navigation";

interface Props {
  description: string;
}

function AnimatedParagraph({ children, delay }: { children: React.ReactNode; delay: number }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, x: -12 }}
      whileInView={shouldReduce ? {} : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{
        position: "relative",
        paddingLeft: "1.25rem",
      }}
    >
      {/* Animated left border accent */}
      <motion.span
        initial={shouldReduce ? {} : { height: 0 }}
        whileInView={shouldReduce ? {} : { height: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "2px",
          background: "var(--color-cyber-blue)",
          opacity: 0.35,
          borderRadius: "1px",
        }}
      />
      {children}
    </motion.div>
  );
}

export function ProjectOverview({ description }: Props) {
  const params = useParams();
  const locale = params?.locale as string;
  const paragraphs = description.split("\n\n").filter(Boolean);

  return (
    <section data-section="overview" className="section" style={{ borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-bg)" }}>
      <div className="container" style={{ maxWidth: "720px" }}>
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <span className="label" style={{ display: "inline-block", color: "var(--color-cyber-blue)", fontFamily: "var(--font-mono, monospace)" }}>
              {locale === "en" ? "Overview" : "Resumen"}
            </span>
          </div>
          <div style={{ marginBottom: "4rem" }}>
            <SpotlightHeading as="h2" className="heading" style={{ color: "var(--color-fg)", textTransform: "lowercase" }}>
              {locale === "en" ? "the project" : "el proyecto"}
            </SpotlightHeading>
          </div>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {paragraphs.map((para, i) => {
            const isHeading = para.toUpperCase() === para && para.length < 50;
            if (isHeading) {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      color: "var(--color-cyber-blue)",
                      marginTop: "1.75rem",
                      marginBottom: "-0.5rem",
                      textTransform: "uppercase",
                    }}
                  >
                    {para}
                  </h3>
                </motion.div>
              );
            }
            return (
              <AnimatedParagraph key={i} delay={i * 0.08}>
                <p
                  style={{
                    fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
                    color: "var(--color-muted)",
                    lineHeight: 1.85,
                    margin: 0,
                    whiteSpace: "pre-line",
                  }}
                >
                  {para}
                </p>
              </AnimatedParagraph>
            );
          })}
        </div>
      </div>
    </section>
  );
}
