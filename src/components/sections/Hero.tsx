"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const item      = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } } };

export function Hero() {
  const t = useTranslations("hero");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        paddingTop: "6rem",
        paddingBottom: "4rem",
        borderBottom: "1px solid var(--color-border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dynamic Background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
        {/* Grid */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(var(--color-border) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            opacity: 0.4,
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
          }}
        />
        {/* AI Glow Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80vw",
            height: "80vw",
            maxWidth: "800px",
            maxHeight: "800px",
            background: "radial-gradient(circle, var(--color-accent) 0%, transparent 60%)",
            filter: "blur(80px)",
            borderRadius: "50%",
          }}
        />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1, marginTop: "-10vh" }}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ maxWidth: "1000px" }}
        >
          {/* Headline */}
          <h1 className="display" style={{ color: "var(--color-fg)", marginBottom: "2rem", whiteSpace: "pre-line" }}>
            <TextReveal text={t("headline")} delay={0.2} />
            <br />
            <motion.span
              variants={item}
              style={{
                color: "var(--color-accent)",
                display: "inline-block",
                transition: "color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease",
                cursor: "default",
                textShadow: "0 0 40px rgba(158, 80, 247, 0.5), 0 0 80px rgba(158, 80, 247, 0.25)"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-accent-hover)";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.02) translateX(4px)";
                (e.currentTarget as HTMLElement).style.textShadow = "0 0 50px rgba(158, 80, 247, 0.7), 0 0 100px rgba(158, 80, 247, 0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
                (e.currentTarget as HTMLElement).style.transform = "scale(1) translateX(0)";
                (e.currentTarget as HTMLElement).style.textShadow = "0 0 40px rgba(158, 80, 247, 0.5), 0 0 80px rgba(158, 80, 247, 0.25)";
              }}
            >
              {t("headline_accent")}
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            style={{
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              color: "var(--color-muted)",
              maxWidth: "40rem",
              marginBottom: "3rem",
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            {t("subheadline")}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <MagneticButton>
              <a 
                href="#projects" 
                id="hero-cta-primary" 
                style={{ 
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  background: "var(--color-fg)", 
                  color: "var(--color-bg)", 
                  border: "none",
                  fontSize: "1rem",
                  fontWeight: 700,
                  padding: "1rem 2.5rem",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  boxShadow: "0 10px 30px rgba(158, 80, 247, 0.05)",
                  transition: "background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-accent)";
                  (e.currentTarget as HTMLElement).style.color = "#ffffff";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 35px rgba(158, 80, 247, 0.45)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-fg)";
                  (e.currentTarget as HTMLElement).style.color = "var(--color-bg)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(158, 80, 247, 0.05)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {t("cta_primary")} <ArrowRight size={18} />
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
