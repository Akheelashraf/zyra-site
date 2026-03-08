"use client";

import {
  createContext,
  useContext,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import { en } from "@/data/translations/en";
import { ar } from "@/data/translations/ar";
import type { Translations } from "@/data/translations/en";

export type Lang = "en" | "ar";

const translations: Record<Lang, Translations> = { en, ar };

type LangContextValue = {
  lang: Lang;
  t: Translations;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({
      lang,
      t: translations[lang] ?? en,
    }),
    [lang]
  );

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang === "ar" ? "ar" : "en";
  }, [lang]);

  return (
    <LangContext.Provider value={value}>{children}</LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within LangProvider");
  }
  return ctx;
}

export function useTranslations(): Translations {
  return useLang().t;
}
