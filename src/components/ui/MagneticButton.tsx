"use client";

import { motion } from "framer-motion";
import { useCallback, useRef, useState, type ReactNode } from "react";

export function MagneticButton({ children, className = "", as = "button", href }: { children: ReactNode, className?: string, as?: any, href?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  }, []);

  const reset = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const Component = as;

  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {href ? (
        <Component href={href} style={{ display: "inherit", width: "100%", height: "100%" }}>
          {children}
        </Component>
      ) : (
        <Component style={{ display: "inherit", width: "100%", height: "100%", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          {children}
        </Component>
      )}
    </motion.div>
  );
}
