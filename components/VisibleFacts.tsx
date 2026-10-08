import { faq } from "@/lib/content";

/** Answers stay in the first HTML response, outside closed details and noscript. */
export function VisibleFacts() {
  return (
    <section id="answers" className="bg-[var(--brand-off-white)] px-6 py-12 text-[var(--brand-ink)]">
      <h2 className="font-display text-[1.6rem]">حقائق منشورة</h2>
      <p className="mt-3 max-w-2xl leading-relaxed">{faq.lead.ar}</p>
      <div className="mt-8 max-w-3xl space-y-8">
        {faq.items.map((item) => (
          <article key={item.id}>
            <h3 className="font-display text-[1.25rem]">{item.q.ar}</h3>
            <p className="mt-2 leading-relaxed">{item.a.ar}</p>
            <p className="mt-2 leading-relaxed" lang="en" dir="ltr">
              {item.q.en} {item.a.en}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
