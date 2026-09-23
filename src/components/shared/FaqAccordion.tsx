type Faq = { question: string; answer: string };

export function FaqAccordion({ faqs, tone = "light" }: { faqs: Faq[]; tone?: "light" | "dark" }) {
  const isDark = tone === "dark";

  return (
    <div className={`divide-y ${isDark ? "divide-near-black/15" : "divide-line-dark"}`}>
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-5">
          <summary
            className={`flex cursor-pointer list-none items-start justify-between gap-6 text-left font-display text-lg font-medium ${
              isDark ? "text-near-black" : "text-warm-white"
            }`}
          >
            {faq.question}
            <span
              aria-hidden
              className={`mt-1 shrink-0 text-xl leading-none ${
                isDark ? "text-bronze-dark" : "text-bronze-light"
              } transition-transform duration-200 group-open:rotate-45`}
            >
              +
            </span>
          </summary>
          <p className={`mt-3 max-w-3xl text-sm leading-relaxed ${isDark ? "text-stone-muted" : "text-stone"}`}>
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
