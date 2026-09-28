"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CacheWorker } from "@/components/CacheWorker";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

function LocaleFlash() {
  const { locale } = useLanguage();
  const first = useRef(true);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setFlash(true);
    const id = window.setTimeout(() => setFlash(false), 280);
    return () => window.clearTimeout(id);
  }, [locale]);

  return flash ? <div className="locale-flash" /> : null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CacheWorker />
        <LocaleFlash />
        {children}
      </ThemeProvider>
    </LanguageProvider>
  );
}
