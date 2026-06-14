"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { LangToggle } from "@/components/ui/LangToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useCallback, useMemo, useState, useEffect, useTransition } from "react";
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
  const [, startTransition] = useTransition();
  const activeSection = useActiveSection();
  useEffect(() => {
    const onScroll = () => startTransition(() => setScrolled(window.scrollY > 16));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [startTransition]);

  const navLinks = useMemo(() => [
    { href: "#services", label: t("services"), id: "services" },
    { href: "#projects", label: t("projects"), id: "projects" },
    { href: "#method",   label: t("method"),   id: "method"   },
    { href: "#about",    label: t("about"),    id: "about"    },
  ], [t]);

  return (
    <>
      <style>{`.navbar-link:hover{color:var(--color-fg)!important}.navbar-cta{position:relative;z-index:1}.navbar-cta::before{content:"";position:absolute;inset:-2px;background:rgba(170,220,236,0.35);filter:blur(16px);border-radius:8px;opacity:0;transition:opacity 0.3s ease;z-index:-1;pointer-events:none}.navbar-cta:hover::before{opacity:1!important}.navbar-cta:hover{border-color:rgba(170,220,236,0.6)!important;background:rgba(170,220,236,0.08)!important;box-shadow:0 0 16px rgba(170,220,236,0.25),0 0 32px rgba(170,220,236,0.08),inset 0 0 12px rgba(170,220,236,0.06)!important;color:var(--color-cyber-blue)!important;transform:scale(1.02)!important}.navbar-cta:active{transform:scale(0.98)!important;box-shadow:inset 0 2px 8px rgba(127,0,224,0.25)!important}`}</style>
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
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "-0.02em",
                textDecoration: "none",
              }}
              aria-label="malcom.builder — home"
            >
              <span style={{ color: "var(--color-fg)" }}>malcom</span>
              <span style={{ color: "var(--color-lime)", fontFamily: "var(--font-mono), monospace", fontWeight: 600 }}>.</span>
              <span style={{ color: "var(--color-accent)" }}>builder</span>
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
                const isActive = activeSection === l.id;
                const commonStyle = {
                  position: "relative",
                  fontSize: "0.875rem",
                  color: isActive ? "var(--color-fg)" : "var(--color-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  fontWeight: isActive ? 600 : 500,
                  paddingBottom: "4px",
                } as React.CSSProperties;

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
                      className="navbar-link"
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
                    className="navbar-link"
                  >
                    {content}
                  </Link>
                );
              })}
            </div>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ThemeToggle />
              <LangToggle />
              <Link href="/brief" style={{ textDecoration: "none", marginLeft: "0.5rem" }}>
                <span
                  className="navbar-cta"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "6.5rem",
                    padding: "0.45rem 0",
                    borderRadius: "8px",
                    border: "1px solid rgba(var(--spotlight-color),0.25)",
                    background: "transparent",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--color-accent)",
                    letterSpacing: "0.01em",
                    transition:
                      "border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease, color 0.25s ease, transform 0.15s ease",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t("cta")}
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
