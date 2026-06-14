"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { Link } from "@/i18n/routing";
import { SpotlightHeading } from "@/components/ui/SpotlightHeading";

export function CTA() {
  const t = useTranslations("cta");

  return (
    <section 
      id="cta" 
      className="py-36 md:py-56 flex flex-col items-center justify-center text-center"
    >
      <div className="container">
        <FadeIn>
          <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
            {/* Pre-título */}
            <span 
              className="text-xs sm:text-sm tracking-widest text-zinc-500 uppercase font-mono font-medium"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("pre_title")}
            </span>

            {/* H2 / Gancho Principal */}
            <SpotlightHeading 
              as="h2" 
              className="heading"
              style={{ color: "var(--color-fg)" }}
            >
              {t("heading")}
            </SpotlightHeading>
            {/* El Botón Masivo */}
            <div className="mt-4">
              <Link href="/brief" style={{ textDecoration: "none" }}>
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 450, damping: 22 }}
                  className="inline-flex items-center justify-center px-10 py-5 bg-white text-black font-bold text-lg sm:text-xl rounded-lg cursor-pointer hover:shadow-[0_0_40px_rgba(170,220,236,0.3)] active:shadow-[inset_0_2px_8px_rgba(127,0,224,0.25)] select-none transition-shadow duration-300 btn-glow-trigger"
                >
                  {t("button_text")}
                </motion.span>
              </Link>
            </div>

            {/* Subtexto de fricción baja */}
            <p className="text-sm sm:text-base text-zinc-500 font-medium tracking-wide">
              {t("sub")}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

