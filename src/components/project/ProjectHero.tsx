"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
};

interface Props {
  title: string;
  category: string;
  tagline: string;
}

export function ProjectHero({ title, category, tagline }: Props) {
  const params = useParams();
  const locale = params?.locale as string;
  const backLabel = locale === "en" ? "Back to home" : "Volver al inicio";

  return (
    <section
      style={{
        minHeight: "85svh",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid var(--color-border)",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--color-bg)",
      }}
    >
      {/* Premium Background Mesh with Interactive-like Gradient Orbs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(var(--color-border) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            opacity: 0.25,
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)",
          }}
        />
        
        {/* Radial Ambient Glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.18, 0.12],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            width: "70vw",
            height: "70vw",
            maxWidth: "700px",
            maxHeight: "700px",
            background: "radial-gradient(circle, var(--color-accent) 0%, transparent 60%)",
            filter: "blur(90px)",
            borderRadius: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "8rem",
          paddingBottom: "5rem",
        }}
      >
        <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: "800px" }}>
          {/* Back link */}
          <motion.div variants={item} style={{ marginBottom: "2.5rem" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.85rem",
                color: "var(--color-muted)",
                textDecoration: "none",
                fontFamily: "var(--font-mono, monospace)",
                transition: "color 0.25s ease, transform 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
                e.currentTarget.style.transform = "translateX(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-muted)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <ArrowLeft size={16} />
              {backLabel}
            </Link>
          </motion.div>

          {/* Category badge */}
          <motion.div
            variants={item}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 0.85rem",
              background: "color-mix(in srgb, var(--color-accent) 6%, transparent)",
              border: "1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)",
              borderRadius: "9999px",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--color-accent)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {category}
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={item}
            className="display"
            style={{
              color: "var(--color-fg)",
              marginBottom: "1.75rem",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={item}
            style={{
              fontSize: "clamp(1.15rem, 2.2vw, 1.45rem)",
              color: "var(--color-muted)",
              maxWidth: "40rem",
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            {tagline}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
