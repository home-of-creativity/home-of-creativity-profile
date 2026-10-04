import type { ReactNode } from "react";

/**
 * Heading inside a `[data-lang]` block. Both language blocks are in the static HTML, and the
 * document is `lang="ar"`, so only the Arabic block carries heading elements: one `<h1>` per
 * page, and no English copy of each `<h2>`. The English block shows the same text as a plain
 * paragraph with the same styling. There is no separate English URL, so there is no hreflang.
 */
export function LangHeading({
  lang,
  level = 1,
  className,
  tagged = false,
  children,
}: {
  lang: "ar" | "en";
  level?: 1 | 2;
  className?: string;
  /** Adds `data-lang` when the heading itself is the language block. */
  tagged?: boolean;
  children: ReactNode;
}) {
  const dataLang = tagged ? { "data-lang": lang } : {};
  if (lang === "en") {
    return (
      <p className={className} {...dataLang}>
        {children}
      </p>
    );
  }
  const Tag = level === 1 ? "h1" : "h2";
  return (
    <Tag className={className} {...dataLang}>
      {children}
    </Tag>
  );
}
