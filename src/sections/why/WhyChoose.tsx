"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "@/contexts/LangContext";

export function WhyChoose() {
  const t = useTranslations();

  return (
    <motion.section
      id="about"
      className="section-padding"
      aria-labelledby="why-heading"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Container>
        <div className="section-intro">
          <h2 id="why-heading" className="section-heading">
            {t.home.why.heading}
          </h2>
        </div>
        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {t.home.why.list.map((point) => (
            <motion.div
              key={point.title}
              className="rounded-2xl border border-gray-200/90 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-zyra-primary/20 hover:shadow-xl"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-lg font-semibold leading-snug text-gray-900">
                {point.title}
              </h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}
