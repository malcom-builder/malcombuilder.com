"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { projects } from "@/lib/constants";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { SpotlightHeading } from "@/components/ui/SpotlightHeading";
import Image from "next/image";
import { SpotlightButton } from "@/components/ui/SpotlightButton";

// ─── Container variants ──────────────────────────────────────────────────────

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

// ─── Heading mask-reveal ─────────────────────────────────────────────────────

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

// ─── Animated counter ────────────────────────────────────────────────────────

const AnimatedCounter = memo(function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 20 });
  const rounded = useTransform(spring, (v) => String(Math.round(v)).padStart(2, "0"));
  const [display, setDisplay] = useState("00");

  useEffect(() => {
    const unsub = rounded.on("change", setDisplay);
    return unsub;
  }, [rounded]);

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  return <span ref={ref}>{display}</span>;
});

// ─── Magnetic wrapper ────────────────────────────────────────────────────────

const MagneticIcon = memo(function MagneticIcon({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });
  const shouldReduce = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: "inline-flex" }}
    >
      {children}
    </motion.div>
  );
});

// ─── Tech colors ─────────────────────────────────────────────────────────────

const techColors: Record<string, string> = {
  "Next.js": "#ffffff",
  React: "#61DAFB",
  TypeScript: "#3178C6",
  "C#": "#68217A",
  ".NET": "#512BD4",
  ".NET 10": "#512BD4",
  ".NET 8": "#512BD4",
  Docker: "#2496ED",
  "SQL Server": "#CC292B",
  Azure: "#0078D4",
  Vercel: "#ffffff",
  Tailwind: "#06B6D4",
  "Framer Motion": "#FF4154",
  Supabase: "#3ECF8E",
  GitHub: "#ffffff",
  "EF Core": "#FF6A00",
  "Telegram API": "#26A5E4",
};

// ─── Project Card ────────────────────────────────────────────────────────────

const ProjectCard = memo(function ProjectCard({ proj }: { proj: typeof projects[number]; index: number }) {
  const num = parseInt(proj.id);
  const shouldReduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spotlight glow tracking (same pattern as Services BentoCard)
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(0);
  const glowX = useSpring(rawX, { stiffness: 150, damping: 20 });
  const glowY = useSpring(rawY, { stiffness: 150, damping: 20 });
  const spotlightBg = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(123, 97, 255, 0.14), transparent 65%)`
  );

  const imageSpotlightMask = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(circle 200px at ${x}% ${y}%, black 0%, transparent 100%)`
  );

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (shouldReduce) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    rawX.set(x);
    rawY.set(y);
    glowX.jump(x);
    glowY.jump(y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width) * 100);
    rawY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const resetGlow = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={cardVariants}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={resetGlow}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "2rem",
        background: "var(--color-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
        aspectRatio: "3 / 2",
        minHeight: "240px",
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
      }}
      whileHover={{
        y: -6,
        borderColor: "var(--color-accent)",
        boxShadow: "0 20px 60px rgba(123, 97, 255, 0.08)",
        transition: { duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] },
      }}
    >
      {/* Spotlight image (reveals image on hover only where cursor is) */}
      {proj.spotlightImage && !shouldReduce && (
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            overflow: "hidden",
            borderRadius: "12px",
            maskImage: imageSpotlightMask,
            WebkitMaskImage: imageSpotlightMask,
          }}
          animate={{ opacity: isHovered ? 0.99 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={proj.spotlightImage}
            alt={proj.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </motion.div>
      )}

      {/* Cursor-tracking spotlight glow — same as Services BentoCard */}
      {!shouldReduce && (
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            background: spotlightBg,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Border accent on hover */}
      {!shouldReduce && (
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "12px",
            border: "1px solid rgba(123, 97, 255, 0.35)",
            pointerEvents: "none",
            zIndex: 0,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />
      )}

      {/* Large translucent animated number */}
      <span
        style={{
          position: "absolute",
          top: "-0.3rem",
          right: "0.75rem",
          fontSize: "clamp(4rem, 10vw, 7rem)",
          fontWeight: 800,
          lineHeight: 1,
          color: "var(--color-border)",
          opacity: 0.35,
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.04em",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <AnimatedCounter value={num} />
      </span>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              fontSize: "0.875rem",
              fontFamily: "monospace",
              fontWeight: 700,
              color: "var(--color-muted)",
            }}
          >
            {proj.id}
          </span>
          <span
            className="label"
            style={{
              color: "var(--color-muted)",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {proj.category}
          </span>
        </div>

        <Link href={`/projects/${proj.slug}`} style={{ textDecoration: "none" }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.25rem",
              letterSpacing: "-0.02em",
              color: "var(--color-fg)",
              marginBottom: "0.5rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-fg)")}
          >
            {proj.title}
          </h3>
        </Link>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Tech stack dots */}
        <div style={{ display: "flex", gap: "0.375rem", marginBottom: "0.75rem", alignItems: "center" }}>
          {proj.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              title={tech}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: techColors[tech] || "var(--color-muted)",
                opacity: 0.65,
                transition: "opacity 0.2s, transform 0.2s",
                cursor: "help",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "scale(1.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.65";
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          ))}
          {proj.techStack.length > 4 && (
            <span
              style={{
                fontSize: "0.6rem",
                color: "var(--color-muted)",
                marginLeft: "0.15rem",
                fontFamily: "monospace",
              }}
            >
              +{proj.techStack.length - 4}
            </span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid var(--color-border)",
            paddingTop: "1rem",
          }}
        >
          <Link
            href={`/projects/${proj.slug}`}
            style={{
              fontSize: "0.85rem",
              color: "var(--color-muted)",
              fontWeight: 500,
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
          >
            {proj.metric}
          </Link>

          <MagneticIcon>
            <a
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                color: "var(--color-muted)",
                textDecoration: "none",
                transition: "color 0.2s, background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
                e.currentTarget.style.backgroundColor = "rgba(123, 97, 255, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-muted)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <ArrowUpRight size={16} />
            </a>
          </MagneticIcon>
        </div>
      </div>
    </motion.div>
  );
});

// ─── Main component ──────────────────────────────────────────────────────────

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="section" style={{ borderBottom: "1px solid var(--color-border)" }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
              },
            }}
            className="label"
            style={{ display: "inline-block", marginBottom: "1rem", color: "var(--color-emerald)" }}
          >
            {t("badge")}
          </motion.span>
          <motion.div variants={headingVariants}>
            <SpotlightHeading as="h2" className="heading" style={{ color: "var(--color-fg)", marginBottom: "3rem", textTransform: "lowercase" }}>
              {t("title")}
            </SpotlightHeading>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          style={{
            display: "grid",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {projects.slice(0, 4).map((proj, i) => (
            <ProjectCard key={proj.id} proj={proj} index={i} />
          ))}
        </motion.div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "3.5rem" }}>
          <SpotlightButton
            href="/projects"
            id="view-all-projects-btn"
            glowColor="rgb(123, 97, 255)"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 2.25rem",
              border: "1px solid var(--color-border)",
              borderRadius: "9999px",
              color: "var(--color-fg)",
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "border-color 0.2s",
            }}
          >
            {t("view_all")}
          </SpotlightButton>
        </div>
      </div>
    </section>
  );
}
