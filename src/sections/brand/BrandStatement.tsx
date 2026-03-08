"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "@/contexts/LangContext";

export function BrandStatement() {
  const t = useTranslations();

  return (
    <motion.section
      className="section-padding"
      aria-label="Brand statement"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Container>
        <div className="section-intro max-w-3xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-zyra-primary">
            {t.home.brand.label}
          </p>
          <h2 className="section-heading mb-7">
            {t.home.brand.heading}
          </h2>
          <p className="section-subtext max-w-prose mx-auto">
            {t.home.brand.body}
          </p>
          <div className="mx-auto mt-14 h-px w-20 bg-gray-300/80" />
        </div>
      </Container>
    </motion.section>
  );
}
