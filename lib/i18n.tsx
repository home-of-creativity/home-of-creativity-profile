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

export const DEFAULT_LOCALE: Locale = "ar";
const STORAGE_KEY = "hoc-locale";

declare global {
  interface Window {
    __HOC_LOCALE__?: Locale;
  }
}

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
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  if (isLocale(window.__HOC_LOCALE__)) return window.__HOC_LOCALE__;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    /* private mode */
  }
  return readCookieLocale() ?? DEFAULT_LOCALE;
}

function applyDocumentLocale(next: Locale, reveal: boolean) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  html.lang = next;
  html.dir = next === "ar" ? "rtl" : "ltr";
  html.style.direction = html.dir;
  html.dataset.locale = next;
  window.__HOC_LOCALE__ = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* private mode */
  }
  document.cookie = `${STORAGE_KEY}=${next};path=/;max-age=31536000;samesite=lax`;
  if (reveal) {
    html.setAttribute("data-i18n-ready", "1");
    html.removeAttribute("data-i18n-pending");
  }
}

// Keep the store on the SSR default until layout runs. Reading storage at
// module init makes getSnapshot() English while the static HTML is still Arabic.
let current: Locale = DEFAULT_LOCALE;

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
  return DEFAULT_LOCALE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const stored = readStoredLocale();
    if (current !== stored) {
      current = stored;
      applyDocumentLocale(stored, false);
      emit();
    } else {
      applyDocumentLocale(stored, true);
    }
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    if (!ready) return;
    applyDocumentLocale(locale, true);
  }, [locale, ready]);

  const setLocale = useCallback((next: Locale) => {
    if (!isLocale(next)) return;
    if (next === current) {
      applyDocumentLocale(next, true);
      return;
    }
    current = next;
    applyDocumentLocale(next, true);
    emit();
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(current === "en" ? "ar" : "en");
  }, [setLocale]);

  const t = useCallback((copy: Copy) => copy?.[locale] ?? copy?.ar ?? copy?.en ?? "", [locale]);

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
