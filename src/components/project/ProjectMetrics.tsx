"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Eye } from "lucide-react";

interface MetricCard {
  label: string;
  value: string;
  desc: string;
  isPositive?: boolean;
}

interface MetricItem {
  name: string;
  value: number | string;
  percent: string;
}

interface Metrics {
  title: string;
  tab_overview?: string;
  tab_channels?: string;
  tab_treatments?: string;
  channels_desc?: string;
  treatments_desc?: string;
  cards: MetricCard[];
  channels?: MetricItem[];
  treatments?: MetricItem[];
}

interface Props {
  slug: string;
  metrics?: Metrics;
}

export function ProjectMetrics({ slug, metrics }: Props) {
  const [metricTab, setMetricTab] = useState<"overview" | "channels" | "treatments">("overview");

  if (!metrics) return null;

  return (
    <section className="section" style={{ borderBottom: "1px solid var(--color-border)", overflow: "hidden" }}>
      <div className="container">
        <span className="label" style={{ display: "inline-block", marginBottom: "2rem" }}>
          {metrics.title}
        </span>

        {/* Tab Selection for Zolfo with Full GA Data */}
        {slug === "zolfo-medicina-estetica" && metrics.channels && metrics.treatments && (
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "3rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "1rem" }}>
            <button
              onClick={() => setMetricTab("overview")}
              style={{
                background: "transparent",
                border: "none",
                color: metricTab === "overview" ? "var(--color-accent)" : "var(--color-muted)",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                paddingBottom: "1rem",
                marginBottom: "-1.05rem",
                borderBottom: metricTab === "overview" ? "2px solid var(--color-accent)" : "none",
                transition: "color 0.2s",
              }}
            >
              {metrics.tab_overview || "Overview"}
            </button>
            <button
              onClick={() => setMetricTab("channels")}
              style={{
                background: "transparent",
                border: "none",
                color: metricTab === "channels" ? "var(--color-accent)" : "var(--color-muted)",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                paddingBottom: "1rem",
                marginBottom: "-1.05rem",
                borderBottom: metricTab === "channels" ? "2px solid var(--color-accent)" : "none",
                transition: "color 0.2s",
                marginLeft: "1.5rem",
              }}
            >
              {metrics.tab_channels || "Traffic Channels"}
            </button>
            <button
              onClick={() => setMetricTab("treatments")}
              style={{
                background: "transparent",
                border: "none",
                color: metricTab === "treatments" ? "var(--color-accent)" : "var(--color-muted)",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                paddingBottom: "1rem",
                marginBottom: "-1.05rem",
                borderBottom: metricTab === "treatments" ? "2px solid var(--color-accent)" : "none",
                transition: "color 0.2s",
                marginLeft: "1.5rem",
              }}
            >
              {metrics.tab_treatments || "Popular Sections"}
            </button>
          </div>
        )}

        {/* ─── TAB 1: OVERVIEW CARD GRID ─── */}
        {metricTab === "overview" && (
          <div
            style={{
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(1, 1fr)",
            }}
            className="sm:grid-cols-2 lg:grid-cols-4"
          >
            {metrics.cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  padding: "2rem",
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  background: "var(--color-card)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = card.isPositive ? "var(--color-emerald)" : "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                }}
              >
                {/* Accent glow line on top */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: card.isPositive ? "var(--color-emerald)" : "var(--color-accent)",
                    opacity: 0.8,
                  }}
                />

                <div style={{ color: "var(--color-muted)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                  {card.label}
                </div>
                <div
                  className="display"
                  style={{
                    fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                    fontWeight: 800,
                    color: card.isPositive ? "var(--color-emerald)" : "var(--color-fg)",
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                  }}
                >
                  {card.value}
                </div>
                <p style={{ color: "var(--color-muted)", fontSize: "0.85rem", lineHeight: 1.4, margin: 0 }}>
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* ─── TAB 2: CHANNELS VISUALIZER (Zolfo Only) ─── */}
        {metricTab === "channels" && metrics.channels && (
          <div style={{ maxWidth: "700px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ color: "var(--color-muted)", fontSize: "0.85rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Users size={16} /> {metrics.channels_desc}
            </div>
            {metrics.channels.map((chan, i) => (
              <div key={chan.name} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "var(--color-fg)", fontWeight: 600 }}>
                  <span>{chan.name}</span>
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    <span style={{ color: "var(--color-muted)" }}>{chan.value}</span>
                    <span style={{ color: "var(--color-accent)" }}>{chan.percent}</span>
                  </div>
                </div>
                {/* Custom animated bar */}
                <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.03)", borderRadius: "99px", overflow: "hidden", border: "1px solid var(--color-border)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: chan.percent }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                    style={{ height: "100%", background: "var(--color-accent)", borderRadius: "99px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── TAB 3: POPULAR TREATMENTS (Zolfo Only) ─── */}
        {metricTab === "treatments" && metrics.treatments && (
          <div style={{ maxWidth: "700px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ color: "var(--color-muted)", fontSize: "0.85rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Eye size={16} /> {metrics.treatments_desc}
            </div>
            {metrics.treatments.map((t, i) => (
              <div key={t.name} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "var(--color-fg)", fontWeight: 600 }}>
                  <span>{t.name}</span>
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    <span style={{ color: "var(--color-muted)" }}>{t.value}</span>
                    <span style={{ color: "var(--color-emerald)" }}>{t.percent}</span>
                  </div>
                </div>
                {/* Custom animated bar */}
                <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.03)", borderRadius: "99px", overflow: "hidden", border: "1px solid var(--color-border)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: t.percent }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                    style={{ height: "100%", background: "var(--color-emerald)", borderRadius: "99px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}