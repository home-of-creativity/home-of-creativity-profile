import type { ReactNode } from "react";

/**
 * Page title inside a `[data-lang]` block. Both language blocks are in the static HTML, and a
 * page gets one `<h1>`: the Arabic one, matching `lang="ar"` on the document. The English block
 * keeps heading semantics for screen readers (only one block is visible at a time) without a
 * second `<h1>` tag. There is one URL per page for both languages, so there is no hreflang.
 */
export function PageTitle({
  lang,
  className,
  tagged = false,
  children,
}: {
  lang: "ar" | "en";
  className?: string;
  /** Adds `data-lang` when the title itself is the language block. */
  tagged?: boolean;
  children: ReactNode;
}) {
  const dataLang = tagged ? { "data-lang": lang } : {};
  if (lang === "ar") {
    return (
      <h1 className={className} {...dataLang}>
        {children}
      </h1>
    );
  }
  return (
    <p role="heading" aria-level={1} className={className} {...dataLang}>
      {children}
    </p>
  );
}
