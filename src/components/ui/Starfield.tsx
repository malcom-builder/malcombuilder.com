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

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

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

        // Proximity glow
        if (mx > 0 && my > 0) {
          const dx = star.x - mx;
          const dy = star.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < hoverRadius) {
            const factor = 1 - dist / hoverRadius;
            // Linear proximity curve to smooth illumination
            opacity = opacity + factor * (0.85 - opacity);
          }
        }

        ctx.fillStyle = `rgba(${starRgb}, ${opacity})`;
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
