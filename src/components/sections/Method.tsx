"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightHeading } from "@/components/ui/SpotlightHeading";
import { stackItems } from "@/lib/constants";
import { motion } from "framer-motion";
import React from "react";

const StackSVGs: Record<string, React.ReactNode> = {
  "Next.js": (
    <svg viewBox="0 0 180 180" width="36" height="36" fill="currentColor" aria-hidden="true">
      <path d="M90 0a90 90 0 1 0 90 90A90.1 90.1 0 0 0 90 0zM54 54h14.38v18.58L112.08 126H126V54h-14v53.42L68.38 54H54zm58 72V72.58l14 18.57V126z" />
    </svg>
  ),
  "React": (
    <svg viewBox="-11.5 -10.232 23 20.463" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </svg>
  ),
  "TypeScript": (
    <svg viewBox="0 0 400 400" width="36" height="36" fill="currentColor" aria-hidden="true">
      <rect x="25" y="25" width="350" height="350" rx="30" fill="none" stroke="currentColor" strokeWidth="30" />
      <path d="M110 135v25h45v110h30V160h45v-25H110z M275 135c-25 0-45 15-45 40v15c0 20 15 30 35 35s35 15 35 30c0 15-15 25-30 25s-30-10-35-25h-30c5 30 25 50 65 50s60-20 60-50c0-30-20-35-40-40s-35-15-35-25c0-15 15-20 25-20s25 10 25 20h30c0-30-25-50-65-50z" />
    </svg>
  ),
  "C#": (
    <svg viewBox="0 0 512 512" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="32" aria-hidden="true">
      <path d="M464,128V384L320,464,176,384V128L320,48ZM320,85,213,144V368L320,427,427,368V144Z" fill="currentColor" stroke="none" />
      <text x="50%" y="55%" textAnchor="middle" fill="currentColor" fontSize="160" fontFamily="sans-serif" fontWeight="800" dy=".3em" stroke="none">C#</text>
    </svg>
  ),
  ".NET": (
    <svg viewBox="0 0 512 512" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="32" aria-hidden="true">
      <rect x="16" y="16" width="480" height="480" rx="64" />
      <text x="50%" y="50%" textAnchor="middle" fill="currentColor" fontSize="180" fontFamily="sans-serif" fontWeight="800" dy=".3em" stroke="none">.NET</text>
    </svg>
  ),
  "Docker": (
    <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor" aria-hidden="true">
      <path d="M22.25 10.155c-.266-.188-.636-.217-.936-.073-.62.302-1.345.459-2.09.459-1.272 0-2.483-.414-3.473-1.155-.386-.289-1.026-.08-1.07.411-.073.805-.28 1.57-.6 2.292-.266.6-.74 1.106-1.353 1.455-.613.35-1.32.535-2.043.535-1.127 0-2.2-.41-3.047-1.157-.393-.346-.99-.214-1.135.297a7.228 7.228 0 00-.236 1.838c0 3.99 3.245 7.235 7.235 7.235h7.32c3.548 0 6.425-2.877 6.425-6.425a6.41 6.41 0 00-4.02-5.96zM8.25 8.78h2.62a.49.49 0 00.49-.49v-2.62a.49.49 0 00-.49-.49H8.25a.49.49 0 00-.49.49v2.62c0 .27.22.49.49.49zm4.27 0h2.62a.49.49 0 00.49-.49v-2.62a.49.49 0 00-.49-.49h-2.62a.49.49 0 00-.49.49v2.62c0 .27.22.49.49.49zm0-4.27h2.62a.49.49 0 00.49-.49V1.4a.49.49 0 00-.49-.49h-2.62a.49.49 0 00-.49.49v2.62c0 .27.22.49.49.49zm-8.54 4.27H6.6a.49.49 0 00.49-.49v-2.62a.49.49 0 00-.49-.49H3.98a.49.49 0 00-.49.49v2.62c0 .27.22.49.49.49z"/>
    </svg>
  ),
  "SQL Server": (
    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  "Azure": (
    <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor" aria-hidden="true">
      <path d="M5.483 21.3H24L14.025 4.013l-3.3 5.41zM13.06 4.908L3.134 22.5H0L9.811 5.15z"/>
    </svg>
  ),
  "Supabase": (
    <svg viewBox="0 0 109 113" width="36" height="36" fill="currentColor" aria-hidden="true">
      <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.8l-43.151 54.421z" opacity="0.6"/>
      <path d="M45.317 2.071C48.177-1.53 53.976.443 54.045 5.041l.922 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.8L45.317 2.071z"/>
    </svg>
  ),
  "Vercel": (
    <svg viewBox="0 0 76 76" width="36" height="36" fill="currentColor" aria-hidden="true">
      <path d="M37.5 5L75 67H0z"/>
    </svg>
  ),
  "Tailwind": (
    <svg viewBox="0 0 54 33" width="40" height="24" fill="currentColor" aria-hidden="true">
      <path d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 12.672 33.808 16 40.5 16c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.328 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 28.872 20.308 32.2 27 32.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.003-5.147-3.653C23.256 19.528 20.192 16.2 13.5 16.2z"/>
    </svg>
  ),
  "Framer Motion": (
    <svg viewBox="0 0 14 21" width="28" height="36" fill="currentColor" aria-hidden="true">
      <path d="M0 0h14v7H7z" />
      <path d="M0 7h7l7 7H0z" opacity="0.6" />
      <path d="M0 14h7v7z" />
    </svg>
  ),
  "GitHub": (
    <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  ),
};

export function Method() {
  const t = useTranslations("method");
  const marqueeItems = [...stackItems, ...stackItems];

  return (
    <section id="method" className="section" style={{ borderBottom: "1px solid var(--color-border)", position: "relative" }}>

      {/* ── Accent orb — top left behind title ── */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "-260px",
        left: "5%",
        width: "55vw",
        height: "55vw",
        maxWidth: "700px",
        maxHeight: "700px",
        background: "radial-gradient(ellipse at 30% 30%, rgba(var(--spotlight-color), 0.15) 0%, rgba(var(--spotlight-color), 0.04) 45%, transparent 65%)",
        filter: "blur(70px)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <FadeIn>
          <div style={{ marginBottom: "1rem" }}>
            <span className="label" style={{ display: "inline-block", color: "var(--color-lime)" }}>{t("badge")}</span>
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <SpotlightHeading as="h2" className="heading" style={{ color: "var(--color-fg)", textTransform: "lowercase" }}>{t("title")}</SpotlightHeading>
          </div>
          <p style={{
            fontSize: "0.9rem",
            color: "var(--color-muted)",
            maxWidth: "24rem",
            marginBottom: "4rem",
            lineHeight: 1.6,
            fontWeight: 400,
          }}>
            {t("subtitle")}
          </p>
        </FadeIn>
      </div>

      <div style={{ position: "relative", width: "100%", paddingBlock: "1rem" }}>
        {/* Edge fades */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "15%", background: "linear-gradient(to right, var(--color-bg), transparent)", zIndex: 10, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "15%", background: "linear-gradient(to left, var(--color-bg), transparent)", zIndex: 10, pointerEvents: "none" }} />

        {/* Marquee track */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", gap: "1rem", width: "fit-content", paddingLeft: "1.5rem" }}
        >
          {marqueeItems.map((item, i) => {
            const pillVariants = {
              rest: {
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                borderColor: "rgba(255, 255, 255, 0.05)",
                color: "var(--color-muted)",
                y: 0,
                scale: 1,
              },
              hover: {
                backgroundColor: "#FFFFFF",
                borderColor: "#FFFFFF",
                color: "#000000",
                y: -6,
                scale: 1.06,
                boxShadow: "0 10px 30px rgba(255, 255, 255, 0.15)",
              }
            };

            const iconVariants = {
              rest: {
                opacity: 0.6,
              },
              hover: {
                opacity: 1,
              }
            };

            return (
              <motion.div
                key={`${item.label}-${i}`}
                variants={pillVariants}
                initial="rest"
                whileHover="hover"
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 2rem",
                  borderRadius: "999px",
                  whiteSpace: "nowrap",
                  cursor: "default",
                  backdropFilter: "blur(4px)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <motion.div
                  variants={iconVariants}
                  style={{
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "color 0.2s, opacity 0.2s",
                    color: "inherit",
                  }}
                >
                  {StackSVGs[item.label] ?? (
                    <span style={{ fontFamily: "monospace", fontSize: "0.85rem", fontWeight: 700, color: "inherit" }}>
                      {item.label[0]}
                    </span>
                  )}
                </motion.div>
                <span style={{ fontSize: "1rem", fontWeight: 600, color: "inherit", transition: "color 0.2s" }}>
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
