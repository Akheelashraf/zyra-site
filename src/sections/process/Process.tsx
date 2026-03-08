"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "@/contexts/LangContext";

export function Process() {
  const t = useTranslations();

  return (
    <motion.section
      className="section-padding bg-zyra-neutral/25"
      aria-labelledby="process-heading"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Container>
        <div className="section-intro">
          <h2 id="process-heading" className="section-heading mb-5">
            {t.home.process.heading}
          </h2>
          <p className="section-subtext mt-4">
            {t.home.process.subtext}
          </p>
        </div>
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {t.home.process.steps.map((step) => (
            <motion.div
              key={step.number}
              className="flex flex-col rounded-2xl border border-gray-200/90 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-zyra-primary/20 hover:shadow-xl"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.25 }}
            >
              <span className="tabular-nums text-2xl font-bold tracking-tight text-zyra-primary md:text-[1.75rem]">
                {step.number}
              </span>
              <h3 className="mt-5 text-lg font-semibold leading-snug text-gray-900">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}
