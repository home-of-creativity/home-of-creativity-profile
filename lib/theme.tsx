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

export type Theme = "light" | "dark";

const STORAGE_KEY = "hoc-theme";

declare global {
  interface Window {
    __HOC_THEME__?: Theme;
  }
}

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isTheme(value: string | null | undefined): value is Theme {
  return value === "dark" || value === "light";
}

function preferredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  if (isTheme(window.__HOC_THEME__)) return window.__HOC_THEME__;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    /* private mode */
  }
  return preferredTheme();
}

function applyDocumentTheme(next: Theme) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  html.setAttribute("data-theme", next);
  html.style.colorScheme = next;
  window.__HOC_THEME__ = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* private mode */
  }
}

// Keep the store on the SSR default until layout runs. Reading the boot
// theme at module init makes getSnapshot() dark while the static HTML is light.
let current: Theme = "light";
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

function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const stored = readStoredTheme();
    current = stored;
    applyDocumentTheme(stored);
    emit();
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    if (!ready) return;
    applyDocumentTheme(theme);
  }, [theme, ready]);

  const setTheme = useCallback((next: Theme) => {
    if (!isTheme(next) || next === current) {
      applyDocumentTheme(next);
      return;
    }
    current = next;
    applyDocumentTheme(next);
    emit();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(current === "dark" ? "light" : "dark");
  }, [setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
