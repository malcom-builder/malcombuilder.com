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
      <mask id="njs-mask" style={{ maskType: "alpha" }}>
        <circle cx="90" cy="90" r="90" />
      </mask>
      <g mask="url(#njs-mask)">
        <circle cx="90" cy="90" r="90" fill="#000" />
        <path d="M149.508 157.52L69.142 54H54v71.908h14.374V72.576l73.43 94.457A90.129 90.129 0 00149.508 157.52z" fill="url(#njs-grad)" />
        <rect x="112" y="54" width="14" height="72" fill="url(#njs-grad2)" />
        <defs>
          <linearGradient id="njs-grad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="njs-grad2" x1="112" y1="54" x2="112" y2="106.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </g>
    </svg>
  ),
  "React": (
    <svg viewBox="-11.5 -10.232 23 20.463" width="36" height="36" aria-hidden="true">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  ),
  "TypeScript": (
    <svg viewBox="0 0 400 400" width="36" height="36" aria-hidden="true">
      <rect width="400" height="400" rx="8" fill="#3178C6"/>
      <path d="M87.7 200.7V217h52v148h36.9V217h52v-16.3c0-9 0-16.5-.4-16.7-.3-.3-31.7-.4-70-.4l-69.6.1v16z" fill="#fff"/>
      <path d="M321.4 184.1c10.7 2.7 18.8 7.6 26.3 15.5 3.9 4.2 9.6 11.7 10.1 13.5.1.6-18.2 12.8-29.3 19.7-.4.3-2-1.6-3.8-4.5-5.4-7.8-11-11.2-19.6-11.8-12.6-.8-20.8 5.7-20.7 16.4 0 3.2.5 5 1.8 7.6 2.8 5.8 8 9.3 23.2 16.4 28.6 12.3 40.9 20.4 48.5 31.9 8.5 12.8 10.4 33.3 4.6 48.6-6.3 16.6-22 27.8-44.2 31.5-6.8 1.2-23.1 1-30.5-.3-16.1-2.9-31.4-11-40.8-21.7-3.9-4.5-11.4-16.1-10.9-16.9.2-.3 1.9-1.3 3.8-2.4 1.9-1 9.1-5.2 16-9.4l12.5-7.6 2.6 3.8c3.6 5.5 11.5 13 16.2 15.5 13.6 7.1 32.3 6.1 41.5-2.1 3.9-3.6 5.5-7.3 5.5-12.8 0-4.9-.6-7.1-3.2-10.8-3.3-4.7-10-8.7-29.2-17.2-21.9-9.4-31.3-15.2-39.8-24.4-5-5.4-9.7-14.4-11.6-22.1-1.6-6.5-2-22.5-.7-29.1 4.7-24.2 21.4-40.9 44.8-45.1 7.7-1.4 25.7-.8 33.2 1.2z" fill="#fff"/>
    </svg>
  ),
  "C#": (
    <svg viewBox="0 0 512 512" width="36" height="36" fill="#68217A" aria-hidden="true">
      <path d="M464,128V384L320,464,176,384V128L320,48ZM320,85,213,144V368L320,427,427,368V144Z"/>
      <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="160" fontFamily="sans-serif" fontWeight="800" dy=".3em">C#</text>
    </svg>
  ),
  ".NET": (
    <svg viewBox="0 0 512 512" width="36" height="36" fill="#512BD4" aria-hidden="true">
      <rect width="512" height="512" rx="64"/>
      <text x="50%" y="50%" textAnchor="middle" fill="#fff" fontSize="180" fontFamily="sans-serif" fontWeight="800" dy=".3em">.NET</text>
    </svg>
  ),
  "Docker": (
    <svg viewBox="0 0 24 24" width="36" height="36" fill="#2496ED" aria-hidden="true">
      <path d="M22.25 10.155c-.266-.188-.636-.217-.936-.073-.62.302-1.345.459-2.09.459-1.272 0-2.483-.414-3.473-1.155-.386-.289-1.026-.08-1.07.411-.073.805-.28 1.57-.6 2.292-.266.6-.74 1.106-1.353 1.455-.613.35-1.32.535-2.043.535-1.127 0-2.2-.41-3.047-1.157-.393-.346-.99-.214-1.135.297a7.228 7.228 0 00-.236 1.838c0 3.99 3.245 7.235 7.235 7.235h7.32c3.548 0 6.425-2.877 6.425-6.425a6.41 6.41 0 00-4.02-5.96z"/>
      <path d="M8.25 8.78h2.62a.49.49 0 00.49-.49v-2.62a.49.49 0 00-.49-.49H8.25a.49.49 0 00-.49.49v2.62c0 .27.22.49.49.49zm4.27 0h2.62a.49.49 0 00.49-.49v-2.62a.49.49 0 00-.49-.49h-2.62a.49.49 0 00-.49.49v2.62c0 .27.22.49.49.49zm0-4.27h2.62a.49.49 0 00.49-.49V1.4a.49.49 0 00-.49-.49h-2.62a.49.49 0 00-.49.49v2.62c0 .27.22.49.49.49zm-8.54 4.27H6.6a.49.49 0 00.49-.49v-2.62a.49.49 0 00-.49-.49H3.98a.49.49 0 00-.49.49v2.62c0 .27.22.49.49.49z"/>
    </svg>
  ),
  "SQL Server": (
    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#CC292B" strokeWidth="2" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  "Azure": (
    <svg viewBox="0 0 24 24" width="36" height="36" fill="#0078D4" aria-hidden="true">
      <path d="M5.483 21.3H24L14.025 4.013l-3.3 5.41zM13.06 4.908L3.134 22.5H0L9.811 5.15z"/>
    </svg>
  ),
  "Supabase": (
    <svg viewBox="0 0 109 113" width="36" height="36" aria-hidden="true">
      <defs>
        <linearGradient id="sb1" x1="53.974" y1="54.974" x2="94.163" y2="71.218" gradientUnits="userSpaceOnUse">
          <stop stopColor="#249361"/><stop offset="1" stopColor="#3ECF8E"/>
        </linearGradient>
        <linearGradient id="sb2" x1="36.156" y1="30.578" x2="54.484" y2="65.038" gradientUnits="userSpaceOnUse">
          <stop/><stop offset="1" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.8l-43.151 54.421z" fill="url(#sb1)"/>
      <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.8l-43.151 54.421z" fill="url(#sb2)" fillOpacity=".2"/>
      <path d="M45.317 2.071C48.177-1.53 53.976.443 54.045 5.041l.922 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.8L45.317 2.071z" fill="#3ECF8E"/>
    </svg>
  ),
  "Vercel": (
    <svg viewBox="0 0 76 76" width="36" height="36" fill="currentColor" aria-hidden="true">
      <path d="M37.5 5L75 67H0z"/>
    </svg>
  ),
  "Tailwind": (
    <svg viewBox="0 0 54 33" width="40" height="24" aria-hidden="true">
      <defs>
        <linearGradient id="tw" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2298BD"/><stop offset="100%" stopColor="#0ED7B5"/>
        </linearGradient>
      </defs>
      <path fill="url(#tw)" d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 12.672 33.808 16 40.5 16c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.328 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 28.872 20.308 32.2 27 32.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.003-5.147-3.653C23.256 19.528 20.192 16.2 13.5 16.2z"/>
    </svg>
  ),
  "Framer Motion": (
    <svg viewBox="0 0 14 21" width="28" height="36" fill="none" aria-hidden="true">
      <path d="M0 0h14v7H7z" fill="#FF4154"/>
      <path d="M0 7h7l7 7H0z" fill="#FF8163"/>
      <path d="M0 14h7v7z" fill="#FF4154"/>
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
          {marqueeItems.map((item, i) => (
            <motion.div
              key={`${item.label}-${i}`}
              whileHover={{
                y: -6,
                scale: 1.06,
                borderColor: "var(--color-accent)",
                boxShadow: "0 8px 24px rgba(var(--spotlight-color), 0.12)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem 2rem",
                background: "var(--card-icon-bg)",
                border: "1px solid var(--card-icon-border)",
                borderRadius: "999px",
                whiteSpace: "nowrap",
                cursor: "default",
                backdropFilter: "blur(4px)",
              }}
            >
              <motion.div
                whileHover={{ filter: "grayscale(0) opacity(1)" }}
                style={{
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  filter: "grayscale(0.6) opacity(0.7)",
                  transition: "filter 0.25s",
                }}
              >
                {StackSVGs[item.label] ?? (
                  <span style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "var(--color-muted)", fontWeight: 700 }}>
                    {item.label[0]}
                  </span>
                )}
              </motion.div>
              <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-fg)" }}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
