import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CalendarCheck, Clock, Check, ChevronRight } from "lucide-react";
import { getService, doctorsForService, allServices } from "@/lib/queries";
import { DoctorCard } from "@/components/Cards";
import ServiceIcon from "@/components/ServiceIcon";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { abs, SITE } from "@/lib/site";

export const dynamic = "force-dynamic";
export function generateMetadata({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  return s ? { title: `${s.name} · Adana`, description: s.summary, alternates: { canonical: abs(`/hizmetler/${s.slug}`) } } : { title: "Hizmet" };
}
export default function Page({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) notFound();
  const doctors = doctorsForService(s.id);
  const others = allServices().filter((x) => x.id !== s.id).slice(0, 4);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "MedicalProcedure", name: s.name, description: s.summary, url: abs(`/hizmetler/${s.slug}`), provider: { "@id": abs("/#clinic") }, howPerformed: s.description.slice(0, 200) }} />
      <section className="container-x py-10">
        <nav className="flex items-center gap-1 text-xs text-stone2"><Link href="/">Ana sayfa</Link><ChevronRight size={12} /><Link href="/hizmetler">Hizmetler</Link><ChevronRight size={12} /><span className="text-ink">{s.name}</span></nav>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-brand"><ServiceIcon name={s.icon} /></div><span className="chip">{s.category}</span><span className="chip"><Clock size={12} /> {s.duration} dk</span></div>
            <h1 className="mt-4 font-serif text-4xl font-bold md:text-5xl">{s.name}</h1>
            <p className="mt-3 text-lg text-ink/65">{s.summary}</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">{s.highlights.map((h) => <li key={h} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm shadow-soft"><Check size={16} className="text-brand" />{h}</li>)}</ul>
            <div className="prose-custom mt-8"><ReactMarkdown remarkPlugins={[remarkGfm]}>{s.description}</ReactMarkdown></div>
            <h2 className="mt-12 font-serif text-2xl font-bold">Sık sorulan sorular</h2><div className="mt-4"><FAQ items={s.faqs} /></div>
          </div>
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6"><div className="eyebrow">Randevu</div><h2 className="mt-2 font-serif text-2xl font-bold">Muayene ile başlayalım</h2><p className="mt-2 text-sm text-ink/65">Hekimlerimizin güncel programından uygun saati seçin; onay SMS ile gelir, 24 saat öncesine kadar ücretsiz iptal.</p><Link href={`/randevu?hizmet=${s.slug}`} className="btn-primary mt-5 w-full"><CalendarCheck size={16} /> Online randevu al</Link><a href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Merhaba, ${s.name} hakkında bilgi almak istiyorum.`)}`} className="btn-outline mt-2 w-full">WhatsApp&apos;tan sor</a></div>
            <div className="card p-6"><div className="eyebrow">Bu hizmeti veren hekimler</div><div className="mt-4 space-y-3">{doctors.map((d) => <DoctorCard key={d.id} d={d} />)}</div></div>
          </aside>
        </div>
        <div className="mt-16"><h2 className="font-serif text-2xl font-bold">Diğer hizmetler</h2><div className="mt-4 flex flex-wrap gap-2">{others.map((o) => <Link key={o.id} href={`/hizmetler/${o.slug}`} className="chip py-2 hover:border-brand">{o.name}</Link>)}</div></div>
      </section>
    </>
  );
}
