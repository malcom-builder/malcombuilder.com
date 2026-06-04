"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "@/i18n/routing";

const SECTIONS = ["hero", "showcase", "overview", "metrics", "stack", "features", "links"];

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  showcase: "Showcase",
  overview: "Overview",
  metrics: "Metrics",
  stack: "Stack",
  features: "Features",
  links: "Links",
};

export function ProjectSectionNav() {
  const [active, setActive] = useState(0);
  const shouldReduce = useReducedMotion();

  const pathname = usePathname();

  useEffect(() => {
    const els = SECTIONS.map((id) => document.querySelector(`[data-section="${id}"]`));
    const validEls = els.filter(Boolean) as Element[];

    if (validEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = validEls.indexOf(entry.target);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    validEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const scrollTo = (idx: number) => {
    const el = document.querySelector(`[data-section="${SECTIONS[idx]}"]`);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  if (pathname === "/projects" || shouldReduce) return null;

  return (
    <nav
      aria-label="Section navigation"
      style={{
        position: "fixed",
        right: "1.5rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        padding: "0.75rem 0.5rem",
        background: "rgba(14, 14, 20, 0.6)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--color-border)",
        borderRadius: "9999px",
      }}
    >
      {SECTIONS.map((_, i) => (
        <button
          key={i}
          onClick={() => scrollTo(i)}
          aria-label={SECTION_LABELS[SECTIONS[i]]}
          style={{
            width: i === active ? "10px" : "6px",
            height: i === active ? "10px" : "6px",
            borderRadius: "50%",
            border: "none",
            background: i === active ? "var(--color-accent)" : "var(--color-border)",
            cursor: "pointer",
            padding: 0,
            transition: "all 0.3s cubic-bezier(0.21, 0.47, 0.32, 0.98)",
            boxShadow: i === active ? "0 0 12px rgba(123, 97, 255, 0.4)" : "none",
          }}
        />
      ))}
    </nav>
  );
}
