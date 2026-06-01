"use client";

import { FadeIn } from "@/components/ui/FadeIn";

interface Props {
  description: string;
}

export function ProjectOverview({ description }: Props) {
  const paragraphs = description.split("\n\n").filter(Boolean);

  return (
    <section className="section" style={{ borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-bg)" }}>
      <div className="container" style={{ maxWidth: "720px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {paragraphs.map((para, i) => {
            const isHeading = para.toUpperCase() === para && para.length < 50;
            if (isHeading) {
              return (
                <FadeIn key={i} delay={i * 0.05} direction="up">
                  <h3
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      color: "var(--color-accent)",
                      marginTop: "1.75rem",
                      marginBottom: "-0.5rem",
                      textTransform: "uppercase",
                    }}
                  >
                    {para}
                  </h3>
                </FadeIn>
              );
            }
            return (
              <FadeIn key={i} delay={i * 0.05} direction="up">
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
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
