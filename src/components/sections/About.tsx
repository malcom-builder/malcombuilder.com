"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightHeading } from "@/components/ui/SpotlightHeading";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="section" style={{ borderBottom: "1px solid var(--color-border)", position: "relative", overflow: "hidden" }}>
      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        {/* TOP: Title — uses .heading class for the same text-shadow glow as other sections */}
        <FadeIn delay={0.1} direction="up" className="mb-16 md:mb-28">
          <span className="about-section-label">{t("label")}</span>
          <SpotlightHeading as="h2" className="heading" style={{ marginBottom: 0, textTransform: "lowercase" }}>{t("headline")}</SpotlightHeading>
        </FadeIn>

        {/* La tesis — editorial pullquote */}
        <FadeIn delay={0.15} direction="up">
          <div style={{ position: "relative", marginBottom: "10rem" }}>
            {/* Decorative opening mark */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-0.6em",
                left: "-0.15em",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 8vw, 5rem)",
                fontWeight: 800,
                lineHeight: 1,
                color: "var(--color-emerald)",
                opacity: 0.3,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              "
            </span>
            <blockquote
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
                lineHeight: 1.6,
                color: "var(--color-fg)",
                fontStyle: "italic",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                position: "relative",
                zIndex: 1,
                textShadow: "0 0 30px rgba(158, 80, 247, 0.08)",
              }}
            >
              {t("thesis.text")}
            </blockquote>
          </div>
        </FadeIn>

        <div className="about-grid">

          {/* LEFT COLUMN: Photo */}
          <FadeIn delay={0.2} direction="left" className="about-photo-wrapper">

            {/* Glow halo behind photo */}
            <div aria-hidden="true" style={{
              position: "absolute",
              inset: "-40px",
              background: "radial-gradient(ellipse at 40% 60%, rgba(123,97,255,0.28) 0%, rgba(16,185,129,0.08) 50%, transparent 68%)",
              filter: "blur(28px)",
              zIndex: 0,
              pointerEvents: "none",
              borderRadius: "2rem",
            }} />

            {/* Photo card */}
            <div className="about-photo-card" style={{
              borderRadius: "16px",
              border: "1px solid rgba(123,97,255,0.5)",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 0 0 1px rgba(123,97,255,0.15), 0 0 40px rgba(123,97,255,0.25), 0 32px 80px rgba(0,0,0,0.55)",
              zIndex: 1,
            }}>
              <Image
                src="/images/malcom-about.webp"
                alt="Malcom Foca"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />


            </div>
          </FadeIn>

          {/* RIGHT COLUMN: Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>

            {/* Row 1: WHO */}
            <FadeIn delay={0.3} direction="up" className="about-row !pt-0">
              <div className="about-row-label">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px rgba(16,185,129,0.5)", display: "inline-block" }} />
                  {t("who.label")}
                </span>
              </div>
              <div className="about-row-content">
                <strong>{t("who.name")}</strong>
                <span>{t("who.role")} · {t("who.location")}</span>
              </div>
            </FadeIn>

            {/* Row 2: WHAT HE DOES */}
            <FadeIn delay={0.4} direction="up" className="about-row">
              <div className="about-row-label">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px rgba(16,185,129,0.5)", display: "inline-block" }} />
                  {t("does.label")}
                </span>
              </div>
              <div className="about-row-content">
                <strong>{t("does.bold")}</strong>
                <span>{t("does.line1")}</span>
              </div>
            </FadeIn>

            {/* Row 3: HOW */}
            <FadeIn delay={0.5} direction="up" className="about-row !pb-0 !border-b-0">
              <div className="about-row-label">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px rgba(16,185,129,0.5)", display: "inline-block" }} />
                  {t("how.label")}
                </span>
              </div>
              <div className="about-row-content">
                <strong>{t("how.bold")}</strong>
                <span>{t("how.line1")}</span>
                <span>{t("how.line2")}</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
