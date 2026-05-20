"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";
import { projects } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="section" style={{ borderBottom: "1px solid var(--color-border)" }}>
      <div className="container">
        <FadeIn>
          <span className="label" style={{ display: "inline-block", marginBottom: "1rem" }}>{t("badge")}</span>
          <h2 className="heading" style={{ color: "var(--color-fg)", marginBottom: "3rem" }}>{t("title")}</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ marginTop: "2rem" }}>
          {projects.map((proj, i) => (
            <FadeIn key={proj.id} delay={i * 0.08}>
              <a
                href={proj.url}
                target={proj.url !== "#" ? "_blank" : undefined}
                rel={proj.url !== "#" ? "noopener noreferrer" : undefined}
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
                  transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(158, 80, 247, 0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
                id={`project-${proj.id}`}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                    <span style={{ fontSize: "0.875rem", fontFamily: "monospace", color: "var(--color-accent)", fontWeight: 700 }}>
                      {proj.id}
                    </span>
                    <span className="label" style={{ color: "var(--color-muted)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
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
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--color-border)", paddingTop: "1rem", marginTop: "1rem" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--color-muted)", fontWeight: 500 }}>
                    {proj.metric}
                  </span>
                  <span style={{ color: "var(--color-accent)" }}>
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
