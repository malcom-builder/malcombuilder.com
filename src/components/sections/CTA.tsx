"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";
import { Marquee } from "@/components/ui/Marquee";
import { socialLinks } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function CTA() {
  const t = useTranslations("cta");

  return (
    <section id="cta" style={{ overflow: "hidden", position: "relative" }}>
      {/* Marquee */}
      <div
        style={{
          paddingBlock: "5rem",
          borderBottom: "1px solid var(--color-border)",
          borderTop: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg)",
        }}
      >
        <Marquee text={t("marquee")} />
      </div>

      {/* Content */}
      <div className="section" style={{ paddingTop: "16rem", paddingBottom: "12rem", textAlign: "center" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FadeIn>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2.5rem", position: "relative" }}>
              {/* Radial glow background aura */}
              <div 
                style={{
                  position: "absolute",
                  top: "35%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "min(350px, 80vw)",
                  height: "min(350px, 80vw)",
                  background: "radial-gradient(circle, var(--color-accent) 0%, rgba(158, 80, 247, 0) 70%)",
                  opacity: 0.18,
                  filter: "blur(50px)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              <span 
                className="heading" 
                style={{ 
                  color: "var(--color-fg)", 
                  letterSpacing: "-0.04em",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  position: "relative",
                  zIndex: 1,
                  textShadow: "0 0 40px rgba(158, 80, 247, 0.35), 0 0 80px rgba(158, 80, 247, 0.15)"
                }}
              >
                {t("btn_text")}
              </span>
              <a 
                href={`mailto:${socialLinks.email}`}
                style={{
                  fontSize: "clamp(0.875rem, 1.5vw, 1.1rem)",
                  color: "var(--color-muted)",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "color 0.2s, transform 0.2s",
                  display: "inline-block"
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--color-accent)";
                  (e.target as HTMLElement).style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--color-muted)";
                  (e.target as HTMLElement).style.transform = "scale(1)";
                }}
              >
                {socialLinks.email}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
