"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useLang } from "@/contexts/LangContext";
import { company } from "@/data/company";

export function Footer() {
  const { lang, t } = useLang();
  const [logoError, setLogoError] = useState(false);
  const base = `/${lang}`;
  const quickLinks = [
    { label: t.nav.home, href: base },
    { label: t.nav.services, href: `${base}/services` },
    { label: t.nav.projects, href: `${base}/projects` },
    { label: t.nav.about, href: `${base}/about` },
    { label: t.nav.contact, href: `${base}/contact` },
  ];

  return (
    <footer
      id="contact"
      className="bg-zyra-deep py-20 md:py-24"
      aria-label="Footer"
    >
      <Container>
        <div className="grid gap-14 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-16">
          <div className="lg:col-span-1">
            <Link
              href={base}
              className="inline-flex items-center transition-opacity duration-200 hover:opacity-90"
            >
              {!logoError ? (
                <Image
                  src="/logos/zyra-logo-light.png"
                  alt="Zyra Builds"
                  width={200}
                  height={60}
                  className="h-12 w-auto object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="text-xl font-semibold text-white">Zyra Builds</span>
              )}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
              {t.footer.tagline}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
              {t.footer.quickLinks}
            </h3>
            <ul className="mt-5 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
              {t.footer.services}
            </h3>
            <ul className="mt-5 space-y-4">
              <li>
                <Link href={`${base}/services`} className="text-sm text-white/80 transition-colors duration-200 hover:text-white">
                  {t.footer.links.commercialFitOut}
                </Link>
              </li>
              <li>
                <Link href={`${base}/services`} className="text-sm text-white/80 transition-colors duration-200 hover:text-white">
                  {t.footer.links.officeInteriors}
                </Link>
              </li>
              <li>
                <Link href={`${base}/services`} className="text-sm text-white/80 transition-colors duration-200 hover:text-white">
                  {t.footer.links.restaurantCafe}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
              {t.footer.contact}
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-white/80">
              <li>
                <a
                  href={company.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors duration-200 hover:text-white"
                >
                  <Instagram className="h-[18px] w-[18px] shrink-0 text-white/70" aria-hidden />
                  <span>{company.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-3 transition-colors duration-200 hover:text-white"
                >
                  <Mail className="h-[18px] w-[18px] shrink-0 text-white/70" aria-hidden />
                  <span>{company.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={company.whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors duration-200 hover:text-white"
                >
                  <Phone className="h-[18px] w-[18px] shrink-0 text-white/70" aria-hidden />
                  <span>{company.whatsApp}</span>
                </a>
              </li>
            </ul>
            <p className="mt-7 flex items-start gap-3 text-xs leading-relaxed text-white/55">
              <MapPin className="mt-0.5 h-[16px] w-[16px] shrink-0 text-white/50" aria-hidden />
              <span>{company.region}</span>
            </p>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-10 sm:flex-row">
          <p className="text-sm text-white/55">
            © {new Date().getFullYear()} {company.name}. {t.footer.copyright}
          </p>
          <Link
            href={`${base}/privacy-policy`}
            className="text-sm text-white/55 transition-colors duration-200 hover:text-white/80"
          >
            {t.footer.privacyPolicy}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
