"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LangToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const other = locale === "es" ? "en" : "es";

  function toggle() {
    startTransition(() => {
      router.replace(pathname, { locale: other });
    });
  }

  return (
    <button
      onClick={toggle}
      className="icon-btn"
      aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: "0.75rem",
        letterSpacing: "0.05em",
        width: "2.5rem",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={locale}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ position: "absolute" }}
        >
          {locale.toUpperCase()}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
