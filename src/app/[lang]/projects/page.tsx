"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/sections/footer/Footer";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { company } from "@/data/company";
import { useLang, useTranslations } from "@/contexts/LangContext";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { lang } = useLang();
  const t = useTranslations();
  const p = t.projects;
  const base = `/${lang}`;

  const categories = [
    { id: "all", label: p.filterAll },
    { id: "hospitality", label: p.filterHospitality },
    { id: "office", label: p.filterOffice },
    { id: "renovation", label: p.filterRenovation },
    { id: "exhibition", label: p.filterExhibition },
  ];

  return (
    <>
      <Navbar />
      <main role="main">
        <section className="section-padding border-b border-gray-200/80">
          <Container>
            <div className="section-intro max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zyra-primary">
                {p.label}
              </p>
              <h1 className="section-heading mb-5">{p.heroHeading}</h1>
              <p className="section-subtext">{p.heroSubtext}</p>
            </div>
          </Container>
        </section>

        <section className="section-padding">
          <Container>
            <div className="mb-12 flex flex-wrap justify-center gap-2 border-b border-gray-200/80 pb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveFilter(cat.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    activeFilter === cat.id
                      ? "bg-zyra-primary text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {p.projectList
                .filter(
                  (proj) =>
                    activeFilter === "all" || proj.categoryId === activeFilter
                )
                .map((project, index) => (
                  <motion.article
                    key={project.title}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-zyra-primary/20 hover:shadow-xl"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.65, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-zyra-neutral/60 via-zyra-neutral/45 to-zyra-neutral/35 transition-transform duration-500 group-hover:scale-[1.03] ring-1 ring-black/5">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                        }}
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-8">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zyra-primary">
                        {project.category}
                      </p>
                      <h2 className="mb-3 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        {project.title}
                      </h2>
                      <p className="mb-6 flex-1 text-base leading-relaxed text-gray-600">
                        {project.summary}
                      </p>
                      <Link
                        href={`${base}/contact`}
                        className="inline-flex items-center text-sm font-semibold text-zyra-primary transition-colors duration-200 hover:text-zyra-deep"
                      >
                        {p.discussProject}
                        <span className="ms-1.5 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">→</span>
                      </Link>
                    </div>
                  </motion.article>
                ))}
            </div>
          </Container>
        </section>

        <section className="section-padding bg-zyra-neutral/25">
          <Container>
            <div className="section-intro max-w-2xl">
              <h2 className="section-heading mb-5">{p.trustHeading}</h2>
              <p className="section-subtext">{p.trustBody}</p>
            </div>
          </Container>
        </section>

        <section
          className="relative overflow-hidden bg-gradient-to-br from-zyra-deep via-zyra-primary to-zyra-accent py-24 md:py-32"
          aria-label="Call to action"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(255,255,255,0.14)_0%,transparent_65%)]" />
          <Container className="relative z-10">
            <div className="section-intro max-w-2xl">
              <h2 className="section-heading-on-blue mb-6 md:text-4xl">
                {p.ctaHeading}
              </h2>
              <p className="section-subtext-on-blue mb-12">
                {p.ctaSubtext}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                <Link
                  href={`${base}/contact`}
                  className="inline-flex rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-zyra-deep shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-zyra-primary/25"
                >
                  {p.startInquiry}
                </Link>
                <Link
                  href={company.whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-xl border-2 border-white/90 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/15 hover:text-white"
                >
                  {p.whatsapp}
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
