"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useLang } from "@/contexts/LangContext";

export function Services() {
  const { lang, t } = useLang();
  const base = `/${lang}`;

  return (
    <motion.section
      id="services"
      className="section-padding bg-zyra-neutral/25"
      aria-labelledby="services-heading"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Container>
        <div className="section-intro">
          <h2 id="services-heading" className="section-heading mb-5">
            {t.home.services.heading}
          </h2>
          <p className="section-subtext mt-4">
            {t.home.services.subtext}
          </p>
        </div>
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.home.services.list.map((service) => (
            <motion.article
              key={service.title}
              className="group rounded-2xl border border-gray-200/90 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-zyra-primary/20 hover:shadow-xl"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="mb-4 text-lg font-semibold leading-snug text-gray-900">
                {service.title}
              </h3>
              <p className="mb-7 leading-relaxed text-gray-600">
                {service.description}
              </p>
              <Link
                href={`${base}/services`}
                className="text-sm font-medium text-zyra-primary transition-colors duration-200 hover:text-zyra-deep"
              >
                {t.home.services.learnMore} →
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}
