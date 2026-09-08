"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Locale = "en" | "ar";
export type Copy = { en: string; ar: string };

const STORAGE_KEY = "hoc-locale";

type LanguageContextValue = {
  locale: Locale;
  ready: boolean;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (copy: Copy) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLocale(value: string | null | undefined): value is Locale {
  return value === "ar" || value === "en";
}

function readCookieLocale(): Locale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )hoc-locale=(ar|en)/);
  return match && isLocale(match[1]) ? match[1] : null;
}

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    /* private mode */
  }
  return readCookieLocale() ?? "en";
}

function applyDocumentLocale(next: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = next;
  document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
  document.documentElement.dataset.locale = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* private mode */
  }
  document.cookie = `${STORAGE_KEY}=${next};path=/;max-age=31536000;samesite=lax`;
}

function markDocumentReady() {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-i18n-ready", "1");
  document.documentElement.removeAttribute("data-i18n-pending");
}

let current: Locale = "en";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return current;
}

function getServerSnapshot(): Locale {
  return "en";
}

if (typeof window !== "undefined") {
  const fromDom = document.documentElement.dataset.locale;
  current = isLocale(fromDom) ? fromDom : readStoredLocale();
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const stored = readStoredLocale();
    if (stored !== locale) {
      if (current !== stored) {
        current = stored;
        applyDocumentLocale(stored);
        emit();
      }
      return;
    }
    applyDocumentLocale(locale);
    setReady(true);
  }, [locale]);

  useLayoutEffect(() => {
    if (!ready) return;
    markDocumentReady();
  }, [ready]);

  const setLocale = useCallback((next: Locale) => {
    if (!isLocale(next) || next === current) {
      if (isLocale(next)) applyDocumentLocale(next);
      return;
    }
    current = next;
    applyDocumentLocale(next);
    emit();
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(current === "en" ? "ar" : "en");
  }, [setLocale]);

  const t = useCallback((copy: Copy) => copy?.[locale] ?? "", [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      ready,
      dir: locale === "ar" ? "rtl" : "ltr",
      setLocale,
      toggleLocale,
      t,
    }),
    [locale, ready, setLocale, toggleLocale, t],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
