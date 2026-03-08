import { notFound } from "next/navigation";
import { LangProvider, type Lang } from "@/contexts/LangContext";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

const VALID_LANGS = ["en", "ar"] as const;

function isValidLang(lang: string): lang is Lang {
  return VALID_LANGS.includes(lang as Lang);
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  return (
    <LangProvider lang={lang}>
      <ScrollProgress />
      <FloatingWhatsApp />
      {children}
    </LangProvider>
  );
}
