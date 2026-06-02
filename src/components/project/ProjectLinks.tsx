"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code } from "lucide-react";
import { useRef } from "react";

interface Props {
  url: string;
  github?: string;
}

const listContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const linkItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function MagneticButton({ children, className, href, target, rel }: {
  children: React.ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
}) {
  const shouldReduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduce) return;
    const rect = innerRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - (rect.left + rect.width / 2)) / rect.width) * 6);
    y.set(((e.clientY - (rect.top + rect.height / 2)) / rect.height) * 6);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div variants={linkItem}>
      <a
        href={href}
        target={target}
        rel={rel}
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          position: "relative",
        }}
      >
        <motion.div
          ref={innerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            x: springX,
            y: springY,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {children}
        </motion.div>
      </a>
    </motion.div>
  );
}

export function ProjectLinks({ url, github }: Props) {
  return (
    <section data-section="links" className="section" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="container">
        <motion.div
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <MagneticButton href={url} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Visitar sitio <ArrowUpRight size={16} />
          </MagneticButton>
          {github && (
            <MagneticButton href={github} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <Code size={16} /> Ver código
            </MagneticButton>
          )}
        </motion.div>
      </div>
    </section>
  );
}
