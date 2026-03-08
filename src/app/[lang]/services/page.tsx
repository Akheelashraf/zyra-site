"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/sections/footer/Footer";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { useLang, useTranslations } from "@/contexts/LangContext";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ServicesPage() {
  const { lang } = useLang();
  const t = useTranslations();
  const s = t.services;
  const base = `/${lang}`;

  return (
    <>
      <Navbar />
      <main role="main">
        <section className="section-padding border-b border-gray-200/80">
          <Container>
            <div className="section-intro max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zyra-primary">
                {s.label}
              </p>
              <h1 className="section-heading mb-5">{s.heroHeading}</h1>
              <p className="section-subtext">{s.heroSubtext}</p>
            </div>
          </Container>
        </section>

        {s.serviceList.map((service, index) => (
          <motion.section
            key={service.title}
            className={`section-padding ${index % 2 === 1 ? "bg-zyra-neutral/20" : ""}`}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
          >
            <Container>
              <div className="mx-auto max-w-3xl">
                <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                  {service.title}
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-gray-600">
                  {service.description}
                </p>
                <ul className="mb-10 space-y-3">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zyra-primary" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${base}/contact`}
                  className="inline-flex text-sm font-medium text-zyra-primary transition-colors duration-200 hover:text-zyra-deep"
                >
                  {s.discussService} →
                </Link>
              </div>
            </Container>
          </motion.section>
        ))}

        <motion.section
          className="section-padding bg-zyra-neutral/25"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
        >
          <Container>
            <div className="section-intro">
              <h2 className="section-heading mb-5">{s.processHeading}</h2>
              <p className="section-subtext mt-4">{s.processSubtext}</p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {s.steps.map((step) => (
                <div
                  key={step.number}
                  className="flex flex-col rounded-2xl border border-gray-200/90 bg-white p-8 transition-all duration-300 hover:border-gray-300/80 hover:shadow-card"
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
                </div>
              ))}
            </div>
          </Container>
        </motion.section>

        <section
          className="relative overflow-hidden bg-gradient-to-br from-zyra-deep via-zyra-primary to-zyra-accent py-24 md:py-32"
          aria-label="Call to action"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(255,255,255,0.14)_0%,transparent_65%)]" />
          <Container className="relative z-10">
            <div className="section-intro max-w-2xl">
              <h2 className="section-heading-on-blue mb-6 md:text-4xl">
                {s.ctaHeading}
              </h2>
              <p className="section-subtext-on-blue mb-12">
                {s.ctaSubtext}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                <Link
                  href={`${base}/contact`}
                  className="inline-flex rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-zyra-deep shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-zyra-primary/25"
                >
                  {s.requestQuote}
                </Link>
                <Link
                  href={company.whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-xl border-2 border-white/90 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/15 hover:text-white"
                >
                  {s.whatsapp}
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
