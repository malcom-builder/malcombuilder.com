"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

import { useEffect } from "react";
import { animate } from "framer-motion";

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (!inView || !countRef.current) return;
    
    // Extract numeric part and non-numeric part (e.g. "10+" -> 10 and "+")
    const numMatch = value.match(/\d+/);
    if (!numMatch) {
      countRef.current.textContent = value;
      return;
    }
    
    const num = parseInt(numMatch[0], 10);
    const suffix = value.replace(numMatch[0], "");

    const controls = animate(0, num, {
      duration: 1.5,
      delay: delay,
      ease: [0.21, 0.47, 0.32, 0.98],
      onUpdate(v) {
        if (countRef.current) {
          countRef.current.textContent = Math.round(v) + suffix;
        }
      }
    });

    return controls.stop;
  }, [inView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{
        padding: "2.5rem 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "0.5rem",
        flex: 1,
      }}
    >
      <span className="stat-value" ref={countRef}>0</span>
      <span className="stat-label" style={{ color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.75rem" }}>{label}</span>
    </motion.div>
  );
}

export function About() {
  const t = useTranslations("about");

  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section id="about" className="section" style={{ borderBottom: "1px solid var(--color-border)" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="lg:grid-cols-2"
        >
          {/* Left — text */}
          <FadeIn>
            <span className="label" style={{ display: "inline-block", marginBottom: "1rem" }}>{t("badge")}</span>
            <h2 className="heading" style={{ color: "var(--color-fg)", marginBottom: "1.5rem" }}>{t("title")}</h2>
            <p style={{ color: "var(--color-muted)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "38rem" }}>
              {t("bio")}
            </p>
          </FadeIn>

          {/* Right — stats */}
          <FadeIn delay={0.2}>
            <div
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "2px",
                display: "flex",
                flexWrap: "wrap",
                overflow: "hidden",
              }}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    flexBasis: "50%",
                    borderBottom: i < 2 ? "1px solid var(--color-border)" : "none",
                    borderRight: i % 2 === 0 ? "1px solid var(--color-border)" : "none",
                  }}
                >
                  <StatCard value={stat.value} label={stat.label} delay={i * 0.12} />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
