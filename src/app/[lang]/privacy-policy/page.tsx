"use client";

import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/sections/footer/Footer";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { useLang, useTranslations } from "@/contexts/LangContext";

export default function PrivacyPolicyPage() {
  const { lang } = useLang();
  const t = useTranslations();
  const p = t.privacy;
  const base = `/${lang}`;

  return (
    <>
      <Navbar />
      <main role="main">
        <section className="section-padding">
          <Container size="sm">
            <div className="mx-auto max-w-3xl">
              <h1 className="section-heading mb-8">{p.heading}</h1>
              <p className="mb-12 text-gray-600">{p.intro}</p>

              <div className="space-y-10">
                <section>
                  <h2 className="mb-3 text-lg font-semibold text-gray-900">
                    {p.sections.collect.heading}
                  </h2>
                  <p className="text-gray-600">{p.sections.collect.body}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold text-gray-900">
                    {p.sections.use.heading}
                  </h2>
                  <p className="text-gray-600">{p.sections.use.body}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold text-gray-900">
                    {p.sections.contact.heading}
                  </h2>
                  <p className="text-gray-600">
                    {p.sections.contact.bodyPrefix}
                    <a
                      href={`mailto:${company.email}`}
                      className="font-medium text-zyra-primary transition-colors hover:text-zyra-deep"
                    >
                      {company.email}
                    </a>
                    {p.sections.bodySuffix}
                  </p>
                </section>
              </div>

              <p className="mt-12 text-sm text-gray-500">{p.lastUpdated}</p>

              <Link
                href={base}
                className="mt-8 inline-block text-sm font-medium text-zyra-primary transition-colors hover:text-zyra-deep"
              >
                ← {p.backToHome}
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
