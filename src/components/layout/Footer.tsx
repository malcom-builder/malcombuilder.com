"use client";

import { useTranslations } from "next-intl";
import { socialLinks } from "@/lib/constants";

export function Footer() {
  const t = useTranslations("footer");
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
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <a
          href="/"
          className="footer-wordmark"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--color-fg)",
            textShadow: "0 0 40px rgba(123,97,255,0.35), 0 0 80px rgba(123,97,255,0.18), 0 0 120px rgba(123,97,255,0.08)",
            margin: 0,
            lineHeight: 1.2,
            textDecoration: "none",
          }}
        >
          <span className="fw-malcom">malcom</span>
          <span className="fw-dot">.</span>
          <span className="fw-builder">builder</span>
        </a>

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
