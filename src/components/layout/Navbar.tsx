"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LangToggle } from "@/components/ui/LangToggle";
import { useState, useEffect, useRef } from "react";
import { SpotlightButton } from "@/components/ui/SpotlightButton";
import { motion, AnimatePresence } from "framer-motion";

const SECTION_IDS = ["services", "projects", "method", "about"];

function useActiveSection() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: t("services"), id: "services" },
    { href: "#projects", label: t("projects"), id: "projects" },
    { href: "#method",   label: t("method"),   id: "method"   },
    { href: "#about",    label: t("about"),    id: "about"    },
  ];

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "3.75rem",
            }}
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link
              href="/"
              style={{
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "-0.02em",
                color: "var(--color-fg)",
                textDecoration: "none",
              }}
              aria-label="malcom.builder — home"
            >
              malcom<span style={{ color: "var(--color-accent)" }}>.</span>builder
            </Link>

            {/* Desktop links */}
            <div
              className="hidden md:flex"
              style={{
                gap: "2rem",
                alignItems: "center",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {navLinks.map((l) => {
                const commonStyle = {
                  position: "relative",
                  fontSize: "0.875rem",
                  color: activeSection === l.id ? "var(--color-fg)" : "var(--color-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  fontWeight: activeSection === l.id ? 600 : 500,
                  paddingBottom: "4px",
                } as React.CSSProperties;

                const handleMouseEnter = (e: any) => ((e.currentTarget as HTMLElement).style.color = "var(--color-fg)");
                const handleMouseLeave = (e: any) => ((e.currentTarget as HTMLElement).style.color = activeSection === l.id ? "var(--color-fg)" : "var(--color-muted)");

                const content = (
                  <>
                    {l.label}
                    {activeSection === l.id && (
                      <motion.span
                        layoutId="nav-indicator"
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "2px",
                          background: "var(--color-accent)",
                          borderRadius: "1px",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                );

                if (isHome) {
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      style={commonStyle}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <Link
                    key={l.href}
                    href={`/${l.href}` as any}
                    style={commonStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <LangToggle />
              <ThemeToggle />
              <SpotlightButton
                href="/brief"
                glowColor="rgb(255,255,255)"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--color-accent)",
                  textDecoration: "none",
                  marginLeft: "0.5rem",
                }}
              >
                {t("cta")}
              </SpotlightButton>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
