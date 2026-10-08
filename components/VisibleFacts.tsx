import { faq } from "@/lib/content";

/** Both languages stay in the first HTML, outside closed details and noscript. CSS shows one. */
export function VisibleFacts() {
  return (
    <section id="answers" className="bg-[var(--brand-off-white)] px-6 pb-4 text-[var(--brand-ink)]">
      <div className="mx-auto max-w-3xl">
        <div data-lang="ar" lang="ar" dir="rtl">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)]">حقائق منشورة</h2>
          <p className="mt-3 max-w-2xl leading-relaxed">{faq.lead.ar}</p>
        </div>
        <div data-lang="en" lang="en" dir="ltr">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)]">Published facts</h2>
          <p className="mt-3 max-w-2xl leading-relaxed">{faq.lead.en}</p>
        </div>
        <div className="mt-8 space-y-8">
          {faq.items.map((item) => (
            <article key={item.id}>
              <div data-lang="ar" lang="ar" dir="rtl">
                <h3 className="font-display text-[1.25rem]">{item.q.ar}</h3>
                <p className="mt-2 leading-relaxed">{item.a.ar}</p>
              </div>
              <div data-lang="en" lang="en" dir="ltr">
                <h3 className="font-display text-[1.25rem]">{item.q.en}</h3>
                <p className="mt-2 leading-relaxed">{item.a.en}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
