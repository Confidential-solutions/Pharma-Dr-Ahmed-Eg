import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang, Dir, LocaleDictionary } from "./types";
import { ar } from "./ar";
import { en } from "./en";

export const dictionaries: Record<Lang, LocaleDictionary> = { ar, en };

export interface I18nContextValue {
  lang: Lang;
  dir: Dir;
  isRtl: boolean;
  t: LocaleDictionary;
  toggleLang: () => void;
  setLanguage: (lang: Lang) => void;
}

const defaultContextValue: I18nContextValue = {
  lang: "ar",
  dir: "rtl",
  isRtl: true,
  t: ar,
  toggleLang: () => {},
  setLanguage: () => {},
};

const I18nContext = createContext<I18nContextValue>(defaultContextValue);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "ar") {
        setLang(saved);
      }
    } catch {
      // localStorage may fail in restricted/SSR environments
    }
  }, []);

  const dir: Dir = lang === "ar" ? "rtl" : "ltr";
  const isRtl = lang === "ar";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
      // Set data-dir for Tailwind and CSS selectors
      document.documentElement.setAttribute("data-dir", dir);
    }
  }, [lang, dir]);

  const toggleLang = () => {
    const next: Lang = lang === "ar" ? "en" : "ar";
    try {
      localStorage.setItem("lang", next);
    } catch {
      // Ignore
    }
    setLang(next);
  };

  const setLanguage = (newLang: Lang) => {
    try {
      localStorage.setItem("lang", newLang);
    } catch {
      // Ignore
    }
    setLang(newLang);
  };

  const value: I18nContextValue = {
    lang,
    dir,
    isRtl,
    t: dictionaries[lang] || ar,
    toggleLang,
    setLanguage,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    return defaultContextValue;
  }
  return context;
}

