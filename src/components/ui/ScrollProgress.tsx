"use client";

import { useState, useEffect } from "react";

/**
 * Vanilla JS scroll progress bar. No Framer Motion (no useScroll/useSpring)
 * to avoid any MotionValue or hydration risk. Renders only after mount.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const update = () => {
      const { scrollY } = window;
      const { scrollHeight } = document.documentElement;
      const clientHeight = document.documentElement.clientHeight;
      const max = scrollHeight - clientHeight;
      setProgress(max <= 0 ? 1 : Math.min(scrollY / max, 1));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[100] h-0.5 origin-left bg-zyra-accent shadow-[0_0_12px_rgba(111,125,255,0.5)] transition-transform duration-75 ease-out"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden
    />
  );
}
