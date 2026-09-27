import JsonLd from "./JsonLd";
export default function FAQ({ items, jsonLd = true }: { items: { q: string; a: string }[]; jsonLd?: boolean }) {
  return (
    <div className="space-y-3">
      {jsonLd && <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })) }} />}
      {items.map((i) => <details key={i.q} className="card group px-6 py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">{i.q}<span className="text-brand transition group-open:rotate-45">+</span></summary><p className="mt-3 text-sm text-ink/70">{i.a}</p></details>)}
    </div>
  );
}
