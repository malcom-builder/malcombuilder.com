"use client";

import { Check } from "lucide-react";

interface Props {
  features: string[];
}

export function ProjectFeatures({ features }: Props) {
  return (
    <section className="section" style={{ borderBottom: "1px solid var(--color-border)" }}>
      <div className="container">
        <span className="label" style={{ display: "inline-block", marginBottom: "2rem" }}>Logros</span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "1rem",
          }}
          className="md:grid-cols-2"
        >
          {features.map((feature, i) => (
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
              <span style={{ color: "var(--color-muted)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
