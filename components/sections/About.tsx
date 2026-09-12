"use client";

import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import { about } from "@/lib/content";
import { useLanguage, type Copy } from "@/lib/i18n";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/cn";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading, Shell } from "../ui";

const statements = [
  { id: "vision" as const, copy: about.vision },
  { id: "mission" as const, copy: about.mission },
];

export function About() {
  const { t, locale } = useLanguage();

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[var(--brand-off-white)] py-16 text-[var(--brand-ink)] md:py-24 lg:py-32"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={withBasePath("/photo/about_us_background.webp")}
          alt=""
          fill
          sizes="100vw"
          className={cn(
            "object-cover object-[82%_18%] mix-blend-multiply",
            locale === "ar" && "origin-center -scale-x-100",
          )}
        />
      </div>

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          locale === "ar"
            ? "bg-[linear-gradient(270deg,var(--brand-off-white)_0%,color-mix(in_srgb,var(--brand-off-white)_78%,transparent)_34%,transparent_72%)]"
            : "bg-[linear-gradient(90deg,var(--brand-off-white)_0%,color-mix(in_srgb,var(--brand-off-white)_78%,transparent)_34%,transparent_72%)]",
        )}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--brand-off-white)_28%,transparent)_0%,transparent_18%,color-mix(in_srgb,var(--brand-off-white)_55%,transparent)_58%,color-mix(in_srgb,var(--brand-off-white)_78%,transparent)_100%)]"
      />

      <Shell className="relative z-10">
        <Reveal className="max-w-3xl">
          <SectionHeading kicker={about.kicker} title={about.title} />
          <p className="mt-8 max-w-2xl text-[1.08rem] leading-[1.75] text-[var(--brand-ink)]/78">
            {t(about.body)}
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-16 md:mt-16 md:grid-cols-2 md:gap-12 lg:gap-20">
          {statements.map((item) => (
            <StaggerItem key={item.id}>
              <StatementColumn id={item.id} copy={item.copy} t={t} locale={locale} />
            </StaggerItem>
          ))}
        </Stagger>
      </Shell>
    </section>
  );
}

function StatementColumn({
  id,
  copy,
  t,
  locale,
}: {
  id: "vision" | "mission";
  copy: {
    label: Copy;
    title: Copy;
    image: string;
    imageAlt: Copy;
    body: Copy;
    accents: { en: readonly string[]; ar: readonly string[] };
  };
  t: (entry: Copy) => string;
  locale: "ar" | "en";
}) {
  return (
    <article
      id={id}
      className="group scroll-mt-[calc(var(--nav-height)+0.75rem)] text-start"
    >
      <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-xl border border-[var(--brand-line)] bg-[var(--brand-purple-deep)] sm:aspect-[16/10]">
        <Image
          src={withBasePath(copy.image)}
          alt={t(copy.imageAlt)}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-center transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,color-mix(in_srgb,var(--brand-purple-deep)_42%,transparent)_100%)]"
        />
      </div>

      <h3
        className={cn(
          "font-display m-0 text-3xl font-semibold text-[var(--brand-ink)] md:text-4xl lg:text-5xl",
          locale === "ar" ? "leading-[1.2] tracking-normal" : "leading-[1.05]",
        )}
      >
        {t(copy.title)}
      </h3>
      <span className="lux-rule mt-4 block h-px w-9 bg-[var(--brand-orange)]" />
      <p className="mt-6 text-base leading-[1.7] text-[var(--brand-ink)]/78 md:text-lg">
        <AccentedCopy text={t(copy.body)} accents={copy.accents[locale]} italic={locale === "en"} />
      </p>
    </article>
  );
}

function AccentedCopy({
  text,
  accents,
  italic,
}: {
  text: string;
  accents: readonly string[];
  italic: boolean;
}) {
  if (!accents.length) return <>{text}</>;

  const pattern = accents
    .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .sort((a, b) => b.length - a.length)
    .join("|");
  const re = new RegExp(`(${pattern})`, "g");
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(
      <em
        className={cn(
          "font-normal text-[var(--brand-orange)]",
          italic ? "italic" : "not-italic",
        )}
      >
        {match[1]}
      </em>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return (
    <>
      {nodes.map((node, index) => (
        <Fragment key={index}>{node}</Fragment>
      ))}
    </>
  );
}
