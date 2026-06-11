"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightHeading } from "@/components/ui/SpotlightHeading";
import { memo, useState } from "react";

const SolutionBlock = memo(function SolutionBlock({ solution, label }: { solution: string; label: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="block font-mono text-[10px] tracking-wider text-[var(--color-muted)] uppercase mb-2">
        {label}
      </span>
      <p
        className="text-[var(--color-fg)] font-medium text-xl md:text-2xl lg:text-3xl leading-relaxed transition-all duration-500"
        style={{
          textShadow: isHovered
            ? "0 0 20px rgba(255, 255, 255, 0.7), 0 0 40px rgba(255, 255, 255, 0.3)"
            : "none"
        }}
      >
        {solution}
      </p>
    </div>
  );
});

const ServiceRow = memo(function ServiceRow({ index, t }: { index: number; t: any }) {
  const numberStr = `0${index + 1}`;
  const title = t(`items.${index}.title`);
  const pain = t(`items.${index}.pain`);
  const solution = t(`items.${index}.solution`);

  return (
    <div className="py-12 md:py-20 border-b border-[var(--color-border)] last:border-b-0 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
      {/* Lado izquierdo: Número + Título del Eje */}
      <div className="md:col-span-4 flex flex-col gap-2">
        <span className="font-mono text-sm tracking-widest text-[var(--color-muted)] font-bold">{numberStr}</span>
        <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-fg)] lowercase leading-none">
          {title}
        </h3>
      </div>

      {/* Lado derecho: Dolor vs Solución */}
      <div className="md:col-span-8 flex flex-col gap-8">
        {/* Dolor (Obsoleto) */}
        <div>
          <span className="block font-mono text-[10px] tracking-wider text-[var(--color-muted)] uppercase mb-2">
            [obsoleto]
          </span>
          <p className="text-zinc-500 line-through opacity-70 text-lg md:text-xl lg:text-2xl leading-relaxed font-light">
            {pain}
          </p>
        </div>

        {/* Solución (Premium) */}
        <SolutionBlock solution={solution} label="[premium]" />
      </div>
    </div>
  );
});

export function Services() {
  const t = useTranslations("services");
  const indices = [0, 1, 2];

  return (
    <section id="services" className="section" style={{ borderBottom: "1px solid var(--color-border)" }}>
      <div className="container">
        <FadeIn>
          <div style={{ marginBottom: "1rem" }}>
            <span className="label" style={{ display: "inline-block", color: "var(--color-lime)" }}>
              {t("badge")}
            </span>
          </div>
          <div style={{ marginBottom: "4rem" }}>
            <SpotlightHeading as="h2" className="heading" style={{ color: "var(--color-fg)", textTransform: "lowercase" }}>
              {t("title")}
            </SpotlightHeading>
          </div>
        </FadeIn>

        <div className="flex flex-col">
          {indices.map((idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <ServiceRow index={idx} t={t} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

