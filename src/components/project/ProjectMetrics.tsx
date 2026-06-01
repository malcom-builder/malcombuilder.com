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

const listContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function ProjectMetrics({ slug, metrics }: Props) {
  const [metricTab, setMetricTab] = useState<"overview" | "channels" | "treatments">("overview");

  if (!metrics) return null;

  return (
    <section className="section" style={{ borderBottom: "1px solid var(--color-border)", overflow: "hidden", backgroundColor: "var(--color-bg)" }}>
      <div className="container">
        <span className="label" style={{ display: "inline-block", marginBottom: "2rem" }}>
          {metrics.title}
        </span>

        {/* Tab Selection for Zolfo with Full GA Data */}
        {slug === "zolfo-medicina-estetica" && metrics.channels && metrics.treatments && (
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              marginBottom: "3rem",
              borderBottom: "1px solid var(--color-border)",
              paddingBottom: "1px",
              position: "relative",
            }}
          >
            {[
              { id: "overview", label: metrics.tab_overview || "Overview" },
              { id: "channels", label: metrics.tab_channels || "Traffic Channels" },
              { id: "treatments", label: metrics.tab_treatments || "Popular Sections" },
            ].map((tab) => {
              const isActive = metricTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setMetricTab(tab.id as any)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: isActive ? "var(--color-accent)" : "var(--color-muted)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    paddingBottom: "1rem",
                    position: "relative",
                    transition: "color 0.3s ease",
                  }}
                >
                  <span style={{ position: "relative", zIndex: 2 }}>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeMetricTab"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "var(--color-accent)",
                        zIndex: 1,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* ─── TAB 1: OVERVIEW CARD GRID ─── */}
        {metricTab === "overview" && (
          <motion.div
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {metrics.cards.map((card, i) => (
              <motion.div
                key={i}
                variants={cardItem}
                style={{
                  padding: "2.25rem 2rem",
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  background: "var(--color-card)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease",
                }}
                whileHover={{
                  y: -5,
                  borderColor: card.isPositive ? "var(--color-emerald)" : "var(--color-accent)",
                  boxShadow: card.isPositive 
                    ? "0 16px 40px rgba(16, 185, 129, 0.04)" 
                    : "0 16px 40px rgba(123, 97, 255, 0.04)",
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
          </motion.div>
        )}

        {/* ─── TAB 2: CHANNELS VISUALIZER (Zolfo Only) ─── */}
        {metricTab === "channels" && metrics.channels && (
          <motion.div 
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{ maxWidth: "700px", display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div style={{ color: "var(--color-muted)", fontSize: "0.85rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Users size={16} /> {metrics.channels_desc}
            </div>
            {metrics.channels.map((chan, i) => (
              <motion.div key={chan.name} variants={cardItem} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    style={{ height: "100%", background: "var(--color-accent)", borderRadius: "99px" }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ─── TAB 3: POPULAR TREATMENTS (Zolfo Only) ─── */}
        {metricTab === "treatments" && metrics.treatments && (
          <motion.div 
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{ maxWidth: "700px", display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div style={{ color: "var(--color-muted)", fontSize: "0.85rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Eye size={16} /> {metrics.treatments_desc}
            </div>
            {metrics.treatments.map((t, i) => (
              <motion.div key={t.name} variants={cardItem} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    style={{ height: "100%", background: "var(--color-emerald)", borderRadius: "99px" }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}