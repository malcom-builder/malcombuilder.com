"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } } };

interface Props {
  title: string;
  category: string;
  tagline: string;
}

export function ProjectHero({ title, category, tagline }: Props) {
  return (
    <section
      style={{
        paddingTop: "6rem",
        paddingBottom: "2rem",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid var(--color-border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
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
            opacity: 0.3,
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            width: "60vw",
            height: "60vw",
            maxWidth: "600px",
            maxHeight: "600px",
            background: "radial-gradient(circle, var(--color-accent) 0%, transparent 60%)",
            filter: "blur(80px)",
            borderRadius: "50%",
            transform: "translateX(-50%)",
            opacity: 0.1,
          }}
        />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: "800px" }}>
          {/* Back link */}
          <motion.div variants={item}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--color-muted)",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
                marginBottom: "2rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-fg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
            >
              <ArrowLeft size={16} />
              Volver
            </Link>
          </motion.div>

          {/* Category badge */}
          <motion.div
            variants={item}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.375rem 0.75rem",
              border: "1px solid var(--color-border)",
              borderRadius: "9999px",
              marginBottom: "1.25rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--color-accent)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {category}
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={item}
            className="display"
            style={{ color: "var(--color-fg)", marginBottom: "1.5rem" }}
          >
            {title}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={item}
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
              color: "var(--color-muted)",
              maxWidth: "36rem",
              lineHeight: 1.6,
            }}
          >
            {tagline}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
