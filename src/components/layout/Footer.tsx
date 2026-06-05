"use client";

import { useTranslations } from "next-intl";
import { memo, useState } from "react";
import { socialLinks } from "@/lib/constants";

// ── Simple word with slow color transition on hover ───────────────────────────
const WordmarkWord = memo(function WordmarkWord({
  children,
  hoverColor,
}: {
  children: string;
  hoverColor: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
        fontWeight: 700,
        letterSpacing: "-0.03em",
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        display: "inline-block",
        color: hovered ? hoverColor : "var(--color-fg)",
        transition: "color 0.6s ease",
        cursor: "default",
      }}
    >
      {children}
    </span>
  );
});

// ── Footer ────────────────────────────────────────────────────────────────────
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

        {/* Wordmark */}
        <a
          href="/"
          style={{
            textDecoration: "none",
            display: "inline-block",
            lineHeight: 1.2,
            transform: "none",
          }}
        >
          <WordmarkWord hoverColor="var(--color-accent)">malcom</WordmarkWord>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              color: "var(--color-fg)",
            }}
          >
            .
          </span>
          <WordmarkWord hoverColor="var(--color-emerald)">builder</WordmarkWord>
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
