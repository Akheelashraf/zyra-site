"use client";

import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/sections/footer/Footer";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { useLang, useTranslations } from "@/contexts/LangContext";

export default function ThankYouPage() {
  const { lang } = useLang();
  const t = useTranslations();
  const base = `/${lang}`;

  return (
    <>
      <Navbar />
      <main role="main">
        <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-br from-zyra-deep via-zyra-primary to-zyra-accent py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(255,255,255,0.14)_0%,transparent_65%)]" />
          <Container className="relative z-10">
            <div className="section-intro max-w-xl">
              <h1 className="section-heading-on-blue mb-6 md:text-4xl">
                {t.thankYou.heading}
              </h1>
              <p className="section-subtext-on-blue mb-10">
                {t.thankYou.subtext}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                <Link
                  href={base}
                  className="inline-flex rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-zyra-deep shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-zyra-primary/25"
                >
                  {t.thankYou.backToHome}
                </Link>
                <Link
                  href={company.whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-xl border-2 border-white/90 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/15 hover:text-white"
                >
                  {t.thankYou.whatsapp}
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
