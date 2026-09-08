"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CacheWorker } from "@/components/CacheWorker";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { ScrollTrigger } from "@/lib/gsap-client";

function LocaleFlash() {
  const { locale, ready } = useLanguage();
  const first = useRef(true);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (first.current) {
      first.current = false;
      ScrollTrigger.refresh();
      return;
    }
    setFlash(true);
    const id = window.setTimeout(() => {
      setFlash(false);
      ScrollTrigger.refresh();
    }, 420);
    return () => window.clearTimeout(id);
  }, [locale, ready]);

  return (
    <AnimatePresence>
      {flash ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[70] bg-[var(--brand-purple)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        />
      ) : null}
    </AnimatePresence>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <CacheWorker />
      <LocaleFlash />
      {children}
    </LanguageProvider>
  );
}
