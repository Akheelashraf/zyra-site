"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useLang } from "@/contexts/LangContext";
import { company } from "@/data/company";

export function CTA() {
  const { lang, t } = useLang();
  const base = `/${lang}`;

  return (
    <motion.section
      className="relative overflow-hidden bg-gradient-to-br from-zyra-deep via-zyra-primary to-zyra-accent py-24 md:py-32"
      aria-label="Call to action"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(255,255,255,0.14)_0%,transparent_65%)]" />
      <Container className="relative z-10">
        <div className="section-intro max-w-2xl">
          <h2 className="section-heading-on-blue mb-6 md:text-4xl">
            {t.home.cta.heading}
          </h2>
          <p className="section-subtext-on-blue mb-12">
            {t.home.cta.subtext}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <Link
              href={company.whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-zyra-deep shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl"
            >
              {t.home.cta.whatsapp}
            </Link>
            <Link
              href={`${base}/contact`}
              className="inline-flex rounded-xl border-2 border-white/90 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/15 hover:scale-[1.02]"
            >
              {t.home.cta.sendInquiry}
            </Link>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
