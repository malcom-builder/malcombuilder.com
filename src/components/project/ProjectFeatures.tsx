"use client";

import { Check } from "lucide-react";

type FeatureItem = string | { title: string; desc: string };

interface Props {
  features: FeatureItem[];
  sectionLabel?: string;
}

export function ProjectFeatures({ features, sectionLabel = "Logros" }: Props) {
  return (
    <section className="section" style={{ borderBottom: "1px solid var(--color-border)" }}>
      <div className="container">
        <span className="label" style={{ display: "inline-block", marginBottom: "2rem" }}>{sectionLabel}</span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "1rem",
          }}
          className="md:grid-cols-2"
        >
          {features.map((feature, i) => {
            const isRich = typeof feature === "object";
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0.875rem",
                  alignItems: "flex-start",
                  padding: "1.25rem",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  background: "var(--color-card)",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
              >
                <span
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
                  }}
                >
                  <Check size={14} strokeWidth={3} />
                </span>
                {isRich ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <span style={{ color: "var(--color-fg)", fontSize: "0.95rem", fontWeight: 600, lineHeight: 1.4 }}>
                      {(feature as { title: string; desc: string }).title}
                    </span>
                    <span style={{ color: "var(--color-muted)", fontSize: "0.875rem", lineHeight: 1.5 }}>
                      {(feature as { title: string; desc: string }).desc}
                    </span>
                  </div>
                ) : (
                  <span style={{ color: "var(--color-muted)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                    {feature as string}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
