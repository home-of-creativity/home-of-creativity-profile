"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CacheWorker } from "@/components/CacheWorker";
import { LanguageProvider, useLanguage } from "@/lib/i18n";

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

  return (
    <AnimatePresence>
      {flash ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[70] bg-[var(--brand-purple)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
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
