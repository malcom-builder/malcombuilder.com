"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LangToggle } from "@/components/ui/LangToggle";
import { useState, useEffect } from "react";

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: t("services") },
    { href: "#projects", label: t("projects") },
    { href: "#method",   label: t("method")   },
    { href: "#about",    label: t("about")    },
  ];

  return (
    <>
      <header
        className={`navbar ${scrolled ? "scrolled" : ""}`}
      >
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
                transform: "translateX(-50%)"
              }}
            >
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--color-fg)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--color-muted)")}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <LangToggle />
              <ThemeToggle />
              <a
                href="#cta"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: "140px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  backgroundColor: "var(--color-accent)",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  transition: "transform 0.2s, background-color 0.2s, box-shadow 0.2s",
                  marginLeft: "0.5rem",
                  boxShadow: "0 4px 14px rgba(158, 80, 247, 0.25)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-accent-hover)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px) scale(1.03)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(158, 80, 247, 0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-accent)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(158, 80, 247, 0.25)";
                }}
              >
                {t("cta")}
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
