"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CacheWorker } from "@/components/CacheWorker";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { TITLE_EN_META } from "@/lib/page-meta";
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

/**
 * The exported `<title>` is Arabic. In English, show the page's `hoc:title-en` meta instead,
 * and put the Arabic one back when the visitor switches again. Next rewrites the title on
 * client navigation, so the observer re-applies the English one after each rewrite.
 */
function DocumentTitleSync() {
  const { locale, ready } = useLanguage();
  const pathname = usePathname();
  const arabic = useRef<string | null>(null);
  const written = useRef<string | null>(null);

  useEffect(() => {
    if (!ready) return;

    const apply = () => {
      const english = document.querySelector<HTMLMetaElement>(`meta[name="${TITLE_EN_META}"]`)?.content.trim();
      // Any title this component did not write came from the page's metadata.
      if (document.title && document.title !== written.current) arabic.current = document.title;
      const next = locale === "en" && english ? english : arabic.current;
      if (next && document.title !== next) {
        written.current = next;
        document.title = next;
      }
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [locale, ready, pathname]);

  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CacheWorker />
        <LocaleFlash />
        <DocumentTitleSync />
        {children}
      </ThemeProvider>
    </LanguageProvider>
  );
}
