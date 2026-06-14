"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  phase: number;
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize stars
    const initStars = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      const count = Math.floor((width * height) / 9000); // Faint elegant density
      stars = Array.from({ length: Math.min(count, 200) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.25 + 0.4,
        baseOpacity: Math.random() * 0.12 + 0.03,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    initStars();

    let isHoveringClickable = false;

    const handleResize = () => {
      initStars();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && typeof target.matches === "function" && target.matches("a, button, [role='button'], input, select, textarea, [class*='cursor-pointer'], [style*='cursor: pointer']")) {
        isHoveringClickable = true;
      }
    };

    const handleHoverEnd = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && typeof target.matches === "function" && target.matches("a, button, [role='button'], input, select, textarea, [class*='cursor-pointer'], [style*='cursor: pointer']")) {
        isHoveringClickable = false;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseover", handleHoverStart as EventListener);
    document.body.addEventListener("mouseout", handleHoverEnd as EventListener);

    const isLight = resolvedTheme === "light";
    const starRgb = isLight ? "9, 9, 11" : "255, 255, 255";
    const hoverRadius = 140; // Proximity threshold for cursor glow

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      stars.forEach((star) => {
        // Soft twinkle animation
        star.phase += star.twinkleSpeed;
        const twinkle = Math.sin(star.phase) * 0.05;
        let opacity = Math.max(0.01, star.baseOpacity + twinkle);

        let rgb = starRgb;

        // Proximity glow
        if (mx > 0 && my > 0) {
          const dx = star.x - mx;
          const dy = star.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < hoverRadius) {
            const factor = 1 - dist / hoverRadius;
            // Linear proximity curve to smooth illumination
            opacity = opacity + factor * (0.85 - opacity);

            if (isHoveringClickable) {
              const [startR, startG, startB] = starRgb.split(",").map(Number);
              // Interpolate towards cyber-blue (170, 220, 236)
              const r = Math.round(startR - factor * (startR - 170));
              const g = Math.round(startG - factor * (startG - 220));
              const b = Math.round(startB - factor * (startB - 236));
              rgb = `${r}, ${g}, ${b}`;
            }
          }
        }

        ctx.fillStyle = `rgba(${rgb}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseover", handleHoverStart as EventListener);
      document.body.removeEventListener("mouseout", handleHoverEnd as EventListener);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0, // Underneath text, above AmbientOrb
        pointerEvents: "none",
      }}
    />
  );
}
