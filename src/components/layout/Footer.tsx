"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { socialLinks } from "@/lib/constants";
import { Link } from "@/i18n/routing";

// ── Footer ────────────────────────────────────────────────────────────────────
export function Footer() {
  const t = useTranslations("footer");
  const [logoHovered, setLogoHovered] = useState(false);
  const socials = [
    { href: socialLinks.instagram, label: "Instagram" },
    { href: socialLinks.linkedin, label: "LinkedIn" },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid transparent",
        borderImage: "linear-gradient(90deg, transparent 0%, var(--color-accent) 50%, transparent 100%) 1",
        background: "var(--color-bg)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>

        {/* Wordmark */}
        <Link
          href="/"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          style={{
            textDecoration: "none",
            display: "inline-block",
            lineHeight: 1.2,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              display: "inline-block",
              color: logoHovered ? "var(--color-muted)" : "var(--color-fg)",
              transition: "color 0.6s ease",
              cursor: "pointer",
            }}
          >
            malcom
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              color: logoHovered ? "var(--color-fg)" : "var(--color-muted)",
              display: "inline-block",
              transition: "color 0.6s ease",
              cursor: "pointer",
            }}
          >
            .
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              display: "inline-block",
              color: logoHovered ? "var(--color-fg)" : "var(--color-muted)",
              transition: "color 0.6s ease",
              cursor: "pointer",
            }}
          >
            builder
          </span>
        </Link>

        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "0.8rem",
            color: "var(--color-muted)",
            opacity: 0.5,
            letterSpacing: "0.04em",
            fontWeight: 400,
          }}
        >
          {t("tagline")}
        </p>

        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >
          {socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              style={{
                fontSize: "0.8rem",
                fontWeight: 500,
                textTransform: "lowercase",
                letterSpacing: "0.03em",
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
