"use client";

interface MarqueeProps {
  text: string;
  repeat?: number;
  className?: string;
}

export function Marquee({ text, repeat = 6, className = "" }: MarqueeProps) {
  const items = Array.from({ length: repeat }, (_, i) => i);
  return (
    <div className={`marquee-wrapper ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((_, i) => (
          <span
            key={i}
            className="pr-6"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "var(--color-fg)",
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
