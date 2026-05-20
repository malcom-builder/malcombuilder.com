"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { socialLinks } from "@/lib/constants";

export function Footer() {
  const socials = [
    { href: socialLinks.instagram, label: "Instagram" },
    { href: socialLinks.linkedin,  label: "LinkedIn"  },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        background: "var(--color-bg)",
        paddingTop: "2rem",
        minHeight: "40vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className="container" style={{ paddingBottom: "2rem", paddingTop: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {/* Left col */}
          <div style={{ color: "var(--color-accent)", fontSize: "0.875rem", fontWeight: 600, textShadow: "0 0 20px rgba(158, 80, 247, 0.6), 0 0 40px rgba(158, 80, 247, 0.3)" }}>
            © 2026 malcom.builder
          </div>

          {/* Right col */}
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {socials.map((s) => (
              <a 
                key={s.href} 
                href={s.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-link"
                style={{ fontSize: "0.875rem", textTransform: "lowercase", fontWeight: 500 }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid var(--color-border)", marginTop: "auto" }}>
        <div
          className="container"
          style={{
            paddingTop: "1rem",
            paddingBottom: "1rem",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "var(--color-muted)", opacity: 0.5, letterSpacing: "0.02em" }}>
            Rosario, Argentina · Next.js & AI
          </span>
        </div>
      </div>
    </footer>
  );
}
