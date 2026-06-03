"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <span className="icon-btn" aria-hidden="true" style={{ width: "2.25rem", height: "2.25rem" }} />;

  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "2rem",
        height: "2rem",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "var(--color-muted)",
        transition: "color 0.2s ease",
        padding: 0,
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-fg)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-muted)")}  
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
          style={{ position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
