"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useLang } from "@/contexts/LangContext";

/**
 * Safe motion: only opacity + y with numeric values (no useScroll/useTransform).
 * Staggered entrance: headline → subtext → buttons → visual stage.
 */
const easing = [0.25, 0.46, 0.45, 0.94];
const headline = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: easing },
};
const subtext = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.1, ease: easing },
};
const buttons = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay: 0.2, ease: easing },
};
const stage = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.25, ease: easing },
};

/* Architectural: commercial layout / fit-out zoning – room modules, partitions, alignment */
const SPACE_BLOCKS = [
  { w: "38%", h: "28%", t: "16%", l: "14%", delay: "0s", z: 2 },
  { w: "34%", h: "24%", t: "54%", l: "50%", delay: "0.3s", z: 2 },
  { w: "26%", h: "20%", t: "24%", l: "56%", delay: "0.5s", z: 1 },
  { w: "22%", h: "16%", t: "70%", l: "16%", delay: "0.2s", z: 1 },
];
const DIVIDER_LINES = [
  { t: "32%", l: "22%", w: "22%", h: "1px", dir: "h" },
  { t: "46%", l: "58%", w: "1px", h: "16%", dir: "v" },
  { t: "74%", l: "30%", w: "18%", h: "1px", dir: "h" },
  { t: "40%", l: "40%", w: "1px", h: "10%", dir: "v" },
  { t: "62%", l: "14%", w: "1px", h: "14%", dir: "v" },
];
/* Small alignment / measurement ticks at key positions */
const ALIGNMENT_TICKS = [
  { t: "16%", l: "14%", dir: "tl" },
  { t: "44%", l: "50%", dir: "tl" },
  { t: "24%", l: "82%", dir: "tr" },
  { t: "70%", l: "16%", dir: "bl" },
];

function HeroVisualStageStatic() {
  return (
    <div
      className="relative h-full min-h-[320px] w-full max-w-xl rounded-2xl border border-white/25 shadow-2xl shadow-black/25 lg:min-h-[400px]"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
      <div
        className="absolute inset-0 rounded-2xl opacity-[0.98]"
        style={{
          background: "linear-gradient(145deg, #2F3FB3 0%, #3E4FD3 35%, #5B6AE8 60%, #6F7DFF 80%, #3E4FD3 100%)",
          backgroundSize: "200% 200%",
          animation: "hero-gradient-shift 14s ease-in-out infinite",
        }}
      />
      {/* Refined blueprint grid – plan-sheet feel */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.1]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.95) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.95) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.05]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Soft radial glow – hierarchy and depth */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: "radial-gradient(ellipse 72% 62% at 50% 44%, rgba(255,255,255,0.16) 0%, rgba(111,125,255,0.2) 38%, transparent 68%)",
        }}
      />
      {/* Room-like zones – foreground (z:2) stronger, background (z:1) softer */}
      {SPACE_BLOCKS.map((block, i) => (
        <div
          key={`block-${i}`}
          className="absolute border bg-white/[0.07]"
          style={{
            width: block.w,
            height: block.h,
            top: block.t,
            left: block.l,
            zIndex: block.z,
            borderColor: block.z === 2 ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
            animation: "hero-float 10s ease-in-out infinite",
            animationDelay: block.delay,
          }}
        />
      ))}
      {/* Divider / partition lines */}
      {DIVIDER_LINES.map((line, i) => (
        <div
          key={`line-${i}`}
          className="absolute bg-white/30"
          style={{
            top: line.t,
            left: line.l,
            width: line.dir === "h" ? line.w : line.w,
            height: line.dir === "v" ? line.h : line.h,
          }}
        />
      ))}
      {/* Alignment ticks – measurement logic */}
      {ALIGNMENT_TICKS.map((tick, i) => (
        <div
          key={`tick-${i}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/10"
          style={{ top: tick.t, left: tick.l }}
          aria-hidden
        />
      ))}
      {/* Layered plan sheets – back layer (softer) */}
      <div
        className="absolute border border-white/15 bg-white/[0.03]"
        style={{
          width: "34%",
          height: "24%",
          top: "60%",
          left: "10%",
          zIndex: 0,
          animation: "hero-float 12s ease-in-out infinite",
          animationDelay: "0.4s",
        }}
      />
      <div
        className="absolute border border-white/15 bg-white/[0.03]"
        style={{
          width: "28%",
          height: "18%",
          top: "14%",
          left: "60%",
          zIndex: 0,
          animation: "hero-float 11s ease-in-out infinite",
          animationDelay: "0.6s",
        }}
      />
    </div>
  );
}

export function Hero() {
  const { lang, t } = useLang();
  const base = `/${lang}`;

  return (
    <section
      className="relative min-h-[88vh] overflow-hidden py-20 md:min-h-[90vh] md:py-28"
      aria-label="Hero"
      style={{
        background: "linear-gradient(155deg, #1e2a7a 0%, #2F3FB3 25%, #3E4FD3 50%, #5B6AE8 75%, #6F7DFF 100%)",
        backgroundSize: "200% 200%",
      }}
    >
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: "radial-gradient(ellipse 85% 55% at 50% -15%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.06) 40%, transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.12) 0%, transparent 50%)",
        }}
      />

      <Container className="relative z-10 flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-24">
        <div className="flex flex-1 flex-col justify-center lg:max-w-[34rem]">
          <motion.h1
            className="mb-6 text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.12]"
            {...headline}
          >
            {t.home.hero.title}
          </motion.h1>
          <motion.p
            className="mb-10 max-w-[32rem] text-lg leading-relaxed text-white/90"
            {...subtext}
          >
            {t.home.hero.subtext}
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 sm:gap-5"
            {...buttons}
          >
            <Link
              href={`${base}/contact`}
              className="inline-flex rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-zyra-deep shadow-lg transition-[transform,box-shadow] duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-zyra-primary/20"
            >
              {t.home.hero.requestQuote}
            </Link>
            <Link
              href={`${base}/projects`}
              className="inline-flex rounded-xl border-2 border-white/90 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/15 hover:border-white"
            >
              {t.home.hero.viewProjects}
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="flex flex-1 items-center justify-center min-h-[320px] lg:min-h-[400px]"
          {...stage}
        >
          <HeroVisualStageStatic />
        </motion.div>
      </Container>
    </section>
  );
}
