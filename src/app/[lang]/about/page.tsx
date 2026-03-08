"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/sections/footer/Footer";
import { Container } from "@/components/ui/Container";
import { useLang, useTranslations } from "@/contexts/LangContext";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  const { lang } = useLang();
  const t = useTranslations();
  const a = t.about;
  const base = `/${lang}`;

  return (
    <>
      <Navbar />
      <main role="main">
        <section className="section-padding border-b border-gray-200/80">
          <Container>
            <div className="section-intro max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zyra-primary">
                {a.label}
              </p>
              <h1 className="section-heading mb-5">{a.heroHeading}</h1>
              <p className="section-subtext">{a.heroSubtext}</p>
            </div>
          </Container>
        </section>

        <motion.section
          className="section-padding"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
        >
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                {a.philosophyHeading}
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                {a.philosophyBody}
              </p>
            </div>
          </Container>
        </motion.section>

        <motion.section
          className="section-padding bg-zyra-neutral/25"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
        >
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                {a.whatWeDoHeading}
              </h2>
              <p className="mb-10 text-lg leading-relaxed text-gray-600">
                {a.whatWeDoBody}
              </p>
              <ul className="space-y-4">
                {a.whatWeDoBullets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zyra-primary" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </motion.section>

        <motion.section
          className="section-padding"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
        >
          <Container>
            <div className="section-intro">
              <h2 className="section-heading mb-5">{a.whyHeading}</h2>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              {a.whyList.map((point) => (
                <motion.div
                  key={point.title}
                  className="rounded-2xl border border-gray-200/90 bg-white p-8 shadow-card transition-all duration-300 hover:border-gray-300/80 hover:shadow-card-hover hover:-translate-y-0.5"
                  whileHover={{ y: -2 }}
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

        <motion.section
          className="section-padding bg-zyra-neutral/25"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
        >
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                {a.whereHeading}
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                {a.whereBody}
              </p>
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
                {a.ctaHeading}
              </h2>
              <p className="section-subtext-on-blue mb-12">
                {a.ctaSubtext}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                <Link
                  href={`${base}/contact`}
                  className="inline-flex rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-zyra-deep shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-zyra-primary/25"
                >
                  {a.requestQuote}
                </Link>
                <Link
                  href={`${base}/services`}
                  className="inline-flex rounded-xl border-2 border-white/90 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/15 hover:text-white"
                >
                  {a.viewServices}
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
