"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";
import { Marquee } from "@/components/ui/Marquee";
import { SpotlightButton } from "@/components/ui/SpotlightButton";

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
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <SpotlightButton
                href="/brief"
                glowColor="rgb(255,255,255)"
                className="heading"
                style={{
                  color: "var(--color-accent)",
                  textDecoration: "none",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {t("heading")}
              </SpotlightButton>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-muted)",
                  opacity: 0.6,
                  margin: 0,
                  letterSpacing: "0.02em",
                  position: "relative",
                  zIndex: 1,
                  marginTop: "1.5rem",
                }}
              >
                {t("sub")}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
