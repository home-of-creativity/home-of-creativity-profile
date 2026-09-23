"use client";

import { ClientVoices } from "@/components/sections/ClientVoices";
import { clientStory } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "../motion";
import { SectionHeading, Shell } from "../ui";

export function ClientStory() {
  const { t } = useLanguage();

  return (
    <>
      <section className="bg-[var(--brand-cream)] pt-24 pb-6 md:pt-28">
        <Shell>
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionHeading kicker={clientStory.kicker} title={clientStory.title} align="center" level={1} />
            <p className="mt-5 text-[1.05rem] leading-[1.75] text-[var(--brand-ink)]/80">{t(clientStory.lead)}</p>
            <p className="mt-4 text-[0.98rem] leading-[1.7] text-[var(--brand-ink)]/75">{t(clientStory.body)}</p>
          </Reveal>
        </Shell>
      </section>
      <ClientVoices />
    </>
  );
}
