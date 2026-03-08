"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { useLang } from "@/contexts/LangContext";
import { company } from "@/data/company";

export function Navbar() {
  const pathname = usePathname();
  const { lang, t } = useLang();
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const base = `/${lang}`;
  const navLinks = [
    { label: t.nav.home, href: base },
    { label: t.nav.services, href: `${base}/services` },
    { label: t.nav.projects, href: `${base}/projects` },
    { label: t.nav.about, href: `${base}/about` },
    { label: t.nav.contact, href: `${base}/contact` },
  ];
  const pathEn = pathname ? pathname.replace(/^\/[^/]+/, "/en") : "/en";
  const pathAr = pathname ? pathname.replace(/^\/[^/]+/, "/ar") : "/ar";

  return (
    <header
      className={`sticky top-0 z-50 border-b py-2 transition-all duration-300 ${
        scrolled
          ? "border-gray-300/90 bg-white/[0.97] shadow-md shadow-gray-200/50 backdrop-blur-xl"
          : "border-gray-200/80 bg-white/95 backdrop-blur-md"
      }`}
    >
      <Container>
        <nav
          className="flex h-[4.5rem] items-center justify-between gap-6 sm:h-20"
          aria-label="Main navigation"
        >
          <Link
            href={base}
            className="flex shrink-0 items-center transition-opacity duration-200 hover:opacity-90"
          >
            {!logoError ? (
              <div className="flex items-center">
                <Image
                  src="/logos/zyra-logo-dark.png"
                  alt="Zyra Builds"
                  width={220}
                  height={70}
                  priority
                  className="h-14 w-auto max-h-14 object-contain"
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <span className="text-lg font-semibold tracking-tight text-zyra-deep sm:text-xl">
                Zyra Builds
              </span>
            )}
          </Link>

          <ul className="hidden items-center gap-9 md:flex lg:gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-zyra-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-4">
            <span className="flex items-center text-sm font-medium text-gray-400" aria-label="Language">
              {lang === "en" ? (
                <span className="text-zyra-primary font-semibold">EN</span>
              ) : (
                <Link href={pathEn} className="transition-colors hover:text-gray-600" aria-label="English">
                  EN
                </Link>
              )}
              <span className="mx-1.5" aria-hidden>|</span>
              {lang === "ar" ? (
                <span className="text-zyra-primary font-semibold">AR</span>
              ) : (
                <Link href={pathAr} className="transition-colors hover:text-gray-600" aria-label="العربية">
                  AR
                </Link>
              )}
            </span>
            <Link
              href={`${base}/contact`}
              className="inline-flex rounded-xl bg-zyra-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.02] hover:bg-zyra-deep sm:px-6"
            >
              {t.nav.requestQuote}
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
